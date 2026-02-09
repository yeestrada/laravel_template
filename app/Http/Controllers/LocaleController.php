<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Session;

class LocaleController extends Controller
{
    /**
     * Switch the application locale and redirect back.
     */
    public function switch(string $locale): RedirectResponse
    {
        $locales = config('app.available_locales', ['en', 'es']);
        if (! in_array($locale, $locales, true)) {
            abort(400, 'Unsupported locale');
        }

        Session::put('locale', $locale);

        return redirect()->back();
    }
}
