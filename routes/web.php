<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DomainCheckController;
use App\Http\Controllers\DomainController;
use App\Http\Controllers\NotificationSettingsController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::resource('domains', DomainController::class)
        ->only(['index', 'store', 'update', 'destroy']);
    Route::post('domains/{domain}/checks', [DomainCheckController::class, 'store'])
        ->name('domains.checks.store');
    Route::put('settings/notifications', [NotificationSettingsController::class, 'update'])
        ->name('settings.notifications.update');
});

require __DIR__.'/settings.php';
