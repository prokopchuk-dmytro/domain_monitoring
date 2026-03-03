<?php

namespace App\Http\Controllers;

use App\Models\Domain;
use App\Models\DomainCheck;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $userId = $request->user()->id;

        if (! Schema::hasTable('domains') || ! Schema::hasTable('domain_checks')) {
            return Inertia::render('dashboard', [
                'stats' => [
                    'totalDomains' => 0,
                    'activeDomains' => 0,
                    'lastDayChecks' => 0,
                    'lastDayErrors' => 0,
                ],
                'latestChecks' => [],
                'domains' => [],
                'recentChecks' => [],
                'setupWarning' => 'Потрібно виконати міграції: php artisan migrate',
            ]);
        }

        $totalDomains = Domain::query()
            ->where('user_id', $userId)
            ->count();

        $activeDomains = Domain::query()
            ->where('user_id', $userId)
            ->where('is_active', true)
            ->count();

        $lastDayChecks = DomainCheck::query()
            ->whereHas('domain', fn ($query) => $query->where('user_id', $userId))
            ->where('checked_at', '>=', now()->subDay())
            ->count();

        $lastDayErrors = DomainCheck::query()
            ->whereHas('domain', fn ($query) => $query->where('user_id', $userId))
            ->where('checked_at', '>=', now()->subDay())
            ->whereIn('status', ['down', 'error'])
            ->count();

        $latestChecks = DomainCheck::query()
            ->whereHas('domain', fn ($query) => $query->where('user_id', $userId))
            ->with('domain:id,domain')
            ->latest('checked_at')
            ->limit(10)
            ->get();

        $domains = Domain::query()
            ->where('user_id', $userId)
            ->latest('id')
            ->get();

        $recentChecks = DomainCheck::query()
            ->whereHas('domain', fn ($query) => $query->where('user_id', $userId))
            ->with('domain:id,domain')
            ->latest('checked_at')
            ->limit(100)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalDomains' => $totalDomains,
                'activeDomains' => $activeDomains,
                'lastDayChecks' => $lastDayChecks,
                'lastDayErrors' => $lastDayErrors,
            ],
            'latestChecks' => $latestChecks,
            'domains' => $domains,
            'recentChecks' => $recentChecks,
            'setupWarning' => null,
        ]);
    }
}
