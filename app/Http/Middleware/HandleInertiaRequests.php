<?php

namespace App\Http\Middleware;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = app()->getLocale();
        $langPath = lang_path($locale.'.json');
        $translations = file_exists($langPath)
            ? (array) json_decode(file_get_contents($langPath), true)
            : [];

        $errors = $request->session()->get('errors');
        $validationErrors = $errors?->getBag('default')->getMessages() ?: [];

        $user = $request->user();
        if ($user) {
            $user->load('role');
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'mustVerifyEmail' => $user && $user instanceof MustVerifyEmail,
            'profileStatus' => $request->session()->get('status'),
            'openProfileModal' => $request->session()->pull('openProfileModal', false),
            'locale' => $locale,
            'translations' => $translations,
            'appName' => config('app.name'),
            'appDebug' => config('app.debug'),
            'validationErrors' => $validationErrors,
        ];
    }
}
