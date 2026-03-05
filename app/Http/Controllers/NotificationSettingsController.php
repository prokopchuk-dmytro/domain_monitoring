<?php

namespace App\Http\Controllers;

use App\Http\Requests\NotificationSettingsUpdateRequest;
use Illuminate\Http\RedirectResponse;

class NotificationSettingsController extends Controller
{
    public function update(NotificationSettingsUpdateRequest $request): RedirectResponse
    {
        $request->user()->update($request->validated());

        return back()->with('success', 'Налаштування сповіщень оновлено.');
    }
}
