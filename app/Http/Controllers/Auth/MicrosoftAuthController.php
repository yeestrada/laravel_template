<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        $state = Str::random(40);
        $request->session()->put('oauth_state', $state);

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

        $sessionState = $request->session()->pull('oauth_state');
        if (!$sessionState || !hash_equals($sessionState, $request->input('state'))) {
            return redirect()->route('login')->with('error', __('auth.failed'));
        }

        $tokenResponse = Http::asForm()->post($this->getBaseUrl() . '/token', [
            'client_id' => config('services.microsoft.client_id'),
            'client_secret' => config('services.microsoft.client_secret'),
            'code' => $request->input('code'),
            'redirect_uri' => config('services.microsoft.redirect'),
            'grant_type' => 'authorization_code',
        ]);

        if (!$tokenResponse->successful()) {
            return redirect()->route('login')->with('error', __('auth.failed'));
        }

        $tokenData = $tokenResponse->json();
        $idToken = $tokenData['id_token'] ?? null;
        if (!$idToken) {
            return redirect()->route('login')->with('error', __('auth.failed'));
        }

        $payload = $this->decodeJwtPayload($idToken);
        if (!$payload) {
            return redirect()->route('login')->with('error', __('auth.failed'));
        }

        $azureId = $payload['oid'] ?? $payload['sub'] ?? null;
        $email = $payload['email'] ?? $payload['preferred_username'] ?? null;
        $name = $payload['name'] ?? trim(($payload['given_name'] ?? '') . ' ' . ($payload['family_name'] ?? '')) ?: $email;

        if (!$azureId || !$email) {
            return redirect()->route('login')->with('error', __('auth.failed'));
        }

        $user = User::where('azure_id', $azureId)->first()
            ?? User::where('email', $email)->first();

        if (!$user) {
            $user = User::create([
                'name' => $name,
                'email' => $email,
                'azure_id' => $azureId,
                'password' => null,
                'email_verified_at' => now(),
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
}
