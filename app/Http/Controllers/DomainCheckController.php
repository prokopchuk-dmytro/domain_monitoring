<?php

namespace App\Http\Controllers;

use App\Models\Domain;
use App\Services\DomainMonitorService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class DomainCheckController extends Controller
{
    public function store(
        Request $request,
        Domain $domain,
        DomainMonitorService $domainMonitorService,
    ): RedirectResponse {
        abort_unless($domain->user_id === $request->user()->id, 404);

        $domainMonitorService->check($domain);

        return back()->with('success', 'Проверка выполнена.');
    }
}
