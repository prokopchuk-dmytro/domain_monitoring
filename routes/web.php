<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DomainCheckController;
use App\Http\Controllers\DomainController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
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
});

Route::get('/api/cron/domains-check', function (Request $request): JsonResponse {
    $secret = (string) config('app.cron_secret');
    $token = (string) $request->bearerToken();
    $querySecret = (string) $request->query('secret');

    abort_if($secret === '', 500, 'CRON_SECRET is not configured.');
    abort_unless(
        hash_equals($secret, $token) || hash_equals($secret, $querySecret),
        403,
    );

    Artisan::call('domains:check-due');

    return response()->json([
        'ok' => true,
        'message' => trim(Artisan::output()),
        'ran_at' => now()->toISOString(),
    ]);
});

require __DIR__.'/settings.php';
