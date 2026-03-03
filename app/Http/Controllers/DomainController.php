<?php

namespace App\Http\Controllers;

use App\Http\Requests\DomainStoreRequest;
use App\Http\Requests\DomainUpdateRequest;
use App\Models\Domain;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class DomainController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::location(route('dashboard'));
    }

    public function store(DomainStoreRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $request->user()->domains()->create([
            ...$data,
            'is_active' => array_key_exists('is_active', $data),
            'next_check_at' => array_key_exists('is_active', $data) ? now() : null,
        ]);

        return back()->with('success', 'Домен добавлен.');
    }

    public function update(DomainUpdateRequest $request, Domain $domain): RedirectResponse
    {
        $this->ensureOwnership($request, $domain);

        $data = $request->validated();

        $domain->update([
            ...$data,
            'is_active' => array_key_exists('is_active', $data),
            'next_check_at' => array_key_exists('is_active', $data) ? now() : null,
        ]);

        return back()->with('success', 'Настройки домена обновлены.');
    }

    public function destroy(Request $request, Domain $domain): RedirectResponse
    {
        $this->ensureOwnership($request, $domain);

        $domain->delete();

        return back()->with('success', 'Домен удалён.');
    }

    private function ensureOwnership(Request $request, Domain $domain): void
    {
        abort_unless($domain->user_id === $request->user()->id, 404);
    }
}
