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
        
        // Load translations from PHP files
        $translations = [];
        
        // Load app.php translations
        $appLangPath = lang_path($locale.'/app.php');
        if (file_exists($appLangPath)) {
            $appTranslations = require $appLangPath;
            $translations = array_merge($translations, $this->flattenTranslations($appTranslations));
        }
        
        // Load pagination.php translations
        $paginationLangPath = lang_path($locale.'/pagination.php');
        if (file_exists($paginationLangPath)) {
            $paginationTranslations = require $paginationLangPath;
            $translations = array_merge($translations, $this->flattenTranslations($paginationTranslations, 'pagination'));
        }
        
        // Replace :app_name placeholder with APP_NAME from config
        $appName = config('app.name');
        $translations = array_map(function ($value) use ($appName) {
            return is_string($value) ? str_replace(':app_name', $appName, $value) : $value;
        }, $translations);

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
            'flash' => [
                'error' => $request->session()->pull('error'),
            ],
            'locale' => $locale,
            'translations' => $translations,
            'appName' => config('app.name'),
            'appDebug' => config('app.debug'),
            'validationErrors' => $validationErrors,
        ];
    }

    /**
     * Flatten nested translation array to dot notation for React compatibility.
     *
     * @param  array  $array
     * @param  string  $prefix
     * @return array
     */
    private function flattenTranslations(array $array, string $prefix = ''): array
    {
        $result = [];

        foreach ($array as $key => $value) {
            $newKey = $prefix === '' ? $key : $prefix.'.'.$key;

            if (is_array($value)) {
                $result = array_merge($result, $this->flattenTranslations($value, $newKey));
            } else {
                $result[$newKey] = $value;
            }
        }

        return $result;
    }
}
