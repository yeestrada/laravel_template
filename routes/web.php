<?php

use App\Http\Controllers\LocaleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/locale/{locale}', [LocaleController::class, 'switch'])->name('locale.switch');

Route::get('/', function () {
    $clientId = config('services.microsoft.client_id');
    $redirectUri = config('services.microsoft.redirect');

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'canResetPassword' => Route::has('password.request'),
        'microsoftConfigured' => !empty($clientId) && !empty($redirectUri),
        'loginError' => session('error'),
        'loginErrorDetail' => session('login_error_detail'),
        'openLoginModal' => session()->pull('openLoginModal', false),
    ]);
});

Route::get('/dashboard', function () {
    $user = auth()->user();
    $user?->load('role');
    if ($user && $user->isAdmin()) {
        return Inertia::render('Admin/Dashboard');
    }
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
