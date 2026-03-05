<?php

namespace App\Services;

use App\Models\Domain;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Throwable;

class DomainAlertService
{
    public function sendStatusChangedAlert(
        Domain $domain,
        ?string $previousStatus,
        string $currentStatus,
        ?int $responseCode,
        ?string $error,
    ): void {
        if ($previousStatus === $currentStatus) {
            return;
        }

        $user = $domain->user;
        if (! $user instanceof User) {
            return;
        }

        // For the very first check, notify only if the domain is unavailable.
        if ($previousStatus === null && $currentStatus === 'up') {
            return;
        }

        $message = $this->buildMessage(
            domain: $domain->domain,
            previousStatus: $previousStatus,
            currentStatus: $currentStatus,
            responseCode: $responseCode,
            error: $error,
        );

        $this->sendEmail($user, $domain->domain, $currentStatus, $message);
        $this->sendTelegram($user, $message);
    }

    private function buildMessage(
        string $domain,
        ?string $previousStatus,
        string $currentStatus,
        ?int $responseCode,
        ?string $error,
    ): string {
        $statusFrom = $previousStatus ? strtoupper($previousStatus) : 'N/A';
        $statusTo = strtoupper($currentStatus);
        $timestamp = now()->toDateTimeString();

        return implode("\n", [
            "Domain: {$domain}",
            "Status: {$statusFrom} -> {$statusTo}",
            'HTTP: '.($responseCode ?? '-'),
            'Error: '.($error ?: '-'),
            "Time: {$timestamp}",
        ]);
    }

    private function sendEmail(
        User $user,
        string $domain,
        string $status,
        string $message,
    ): void {
        if (! $user || ! $user->email_notifications_enabled) {
            return;
        }

        $recipient = $user->notification_email ?: $user->email;
        if (! $recipient) {
            return;
        }

        try {
            Mail::raw($message, function ($mail) use ($recipient, $domain, $status): void {
                $mail->to($recipient)
                    ->subject("Domain status changed: {$domain} -> ".strtoupper($status));
            });
        } catch (Throwable $throwable) {
            report($throwable);
        }
    }

    private function sendTelegram(User $user, string $message): void
    {
        $botToken = (string) env('TELEGRAM_BOT_TOKEN', '');

        if (! $user || ! $user->telegram_notifications_enabled || $botToken === '') {
            return;
        }

        $chatId = (string) ($user->telegram_chat_id ?? '');
        if ($chatId === '') {
            return;
        }

        try {
            Http::asForm()
                ->timeout(10)
                ->post("https://api.telegram.org/bot{$botToken}/sendMessage", [
                    'chat_id' => $chatId,
                    'text' => $message,
                ]);
        } catch (Throwable $throwable) {
            report($throwable);
        }
    }
}
