<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

class MicrosoftAuthController extends Controller
{
    protected function getBaseUrl(): string
    {
        $tenant = config('services.microsoft.tenant', 'common');
        return "https://login.microsoftonline.com/{$tenant}/oauth2/v2.0";
    }

    /**
     * Redirect to Microsoft authorization (Authorization Code flow).
     */
    public function redirect(Request $request): RedirectResponse
    {
        $clientId = config('services.microsoft.client_id');
        $redirectUri = config('services.microsoft.redirect');

        if (empty($clientId) || empty($redirectUri)) {
            return redirect()->back()->with('error', __('Microsoft sign-in is not configured. Set MICROSOFT_CLIENT_ID and MICROSOFT_REDIRECT_URI in .env.'));
        }

        // Signed state: no session/cookie needed when returning from Microsoft (avoids state mismatch)
        $state = $this->createSignedState();

        $params = [
            'client_id' => $clientId,
            'response_type' => 'code',
            'redirect_uri' => $redirectUri,
            'response_mode' => 'query',
            'scope' => implode(' ', config('services.microsoft.scopes', ['openid', 'email', 'profile'])),
            'state' => $state,
        ];

        $url = $this->getBaseUrl() . '/authorize?' . http_build_query($params);
        return redirect()->away($url);
    }

    /**
     * Handle callback from Microsoft: validate state, exchange code for tokens, find or create user, log in.
     */
    public function callback(Request $request): RedirectResponse
    {
        $request->validate([
            'state' => 'required|string',
            'code' => 'required|string',
        ]);

        $receivedState = $request->input('state');
        if (!$this->verifySignedState($receivedState)) {
            logger()->warning('Microsoft OAuth state invalid or expired', [
                'received_length' => strlen($receivedState),
            ]);
            $msg = __('auth.microsoft_failed');
            if (config('app.debug')) {
                $msg .= ' ' . __('auth.microsoft_error_state');
            }
            return redirect('/')->with('error', $msg);
        }

        $tokenResponse = Http::asForm()->post($this->getBaseUrl() . '/token', [
            'client_id' => config('services.microsoft.client_id'),
            'client_secret' => config('services.microsoft.client_secret'),
            'code' => $request->input('code'),
            'redirect_uri' => config('services.microsoft.redirect'),
            'grant_type' => 'authorization_code',
        ]);

        if (!$tokenResponse->successful()) {
            $body = $tokenResponse->json();
            logger()->error('Microsoft OAuth token request failed', [
                'status' => $tokenResponse->status(),
                'body' => $body,
            ]);
            $msg = __('auth.microsoft_failed');
            if (config('app.debug') && is_array($body)) {
                $detail = $body['error_description'] ?? $body['error'] ?? json_encode($body);
                $request->session()->flash('login_error_detail', $detail);
            }
            return redirect('/')->with('error', $msg);
        }

        $tokenData = $tokenResponse->json();
        $idToken = $tokenData['id_token'] ?? null;
        if (!$idToken) {
            logger()->error('Microsoft OAuth: id_token missing from token response', [
                'tokenData' => $tokenData,
            ]);
            $msg = __('auth.microsoft_failed');
            if (config('app.debug') && is_array($tokenData)) {
                $request->session()->flash('login_error_detail', 'id_token missing. Response: ' . json_encode($tokenData));
            }
            return redirect('/')->with('error', $msg);
        }

        $payload = $this->decodeJwtPayload($idToken);
        if (!$payload) {
            logger()->error('Microsoft OAuth: failed to decode id_token payload', [
                'id_token' => $idToken,
            ]);
            return redirect('/')->with('error', __('auth.microsoft_failed'));
        }

        $azureId = $payload['oid'] ?? $payload['sub'] ?? null;
        $email = $payload['email'] ?? $payload['preferred_username'] ?? null;
        $name = $payload['name'] ?? trim(($payload['given_name'] ?? '') . ' ' . ($payload['family_name'] ?? '')) ?: $email;

        if (!$azureId || !$email) {
            logger()->error('Microsoft OAuth: missing azureId or email in id_token payload', [
                'payload' => $payload,
                'azureId' => $azureId,
                'email' => $email,
            ]);
            return redirect('/')->with('error', __('auth.microsoft_failed'));
        }

        $user = User::where('azure_id', $azureId)->first()
            ?? User::where('email', $email)->first();

        if (!$user) {
            $userRole = Role::where('slug', 'user')->first();
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'azure_id' => $azureId,
                'password' => null,
                'email_verified_at' => now(),
                'role_id' => $userRole?->id,
            ]);
        } else {
            if (empty($user->azure_id)) {
                $user->update(['azure_id' => $azureId]);
            }
            if (empty($user->email_verified_at)) {
                $user->update(['email_verified_at' => now()]);
            }
        }

        Auth::login($user, true);
        return redirect()->intended(route('dashboard', absolute: false));
    }

    protected function decodeJwtPayload(string $jwt): ?array
    {
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) {
            return null;
        }
        $payload = base64_decode(strtr($parts[1], '-_', '+/'), true);
        return $payload !== false ? json_decode($payload, true) : null;
    }

    /**
     * Create a signed state that can be verified without session/cookie (survives cross-site redirect).
     */
    protected function createSignedState(): string
    {
        $payload = [
            'v' => Str::random(40),
            'e' => time() + 600, // valid 10 minutes
        ];
        return Crypt::encryptString(json_encode($payload));
    }

    /**
     * Verify the signed state returned by Microsoft.
     */
    protected function verifySignedState(string $state): bool
    {
        try {
            $json = Crypt::decryptString($state);
            $payload = json_decode($json, true);
            if (!is_array($payload) || empty($payload['e'])) {
                return false;
            }
            return (int) $payload['e'] >= time();
        } catch (\Throwable) {
            return false;
        }
    }
}
