<?php

namespace App\Services;

use App\Models\Domain;
use App\Models\DomainCheck;
use Carbon\CarbonInterface;
use Illuminate\Support\Facades\Http;
use Throwable;

class DomainMonitorService
{
    public function check(Domain $domain): DomainCheck
    {
        $checkedAt = now();
        $targetUrl = $this->normalizeTarget($domain->domain);
        $method = strtolower($domain->check_method) === 'get' ? 'get' : 'head';
        $responseCode = null;
        $responseTimeMs = null;
        $error = null;
        $status = 'error';

        $startedAt = microtime(true);

        try {
            $response = Http::timeout($domain->request_timeout_seconds)
                ->send(strtoupper($method), $targetUrl);

            $responseCode = $response->status();
            $responseTimeMs = (int) round((microtime(true) - $startedAt) * 1000);
            $status = $response->successful() || $response->redirection() ? 'up' : 'down';
        } catch (Throwable $throwable) {
            $responseTimeMs = (int) round((microtime(true) - $startedAt) * 1000);
            $error = mb_substr($throwable->getMessage(), 0, 1000);
        }

        $check = $domain->checks()->create([
            'status' => $status,
            'response_code' => $responseCode,
            'response_time_ms' => $responseTimeMs,
            'error' => $error,
            'checked_at' => $checkedAt,
        ]);

        $domain->update([
            'last_status' => $status,
            'last_response_code' => $responseCode,
            'last_response_time_ms' => $responseTimeMs,
            'last_error' => $error,
            'last_checked_at' => $checkedAt,
            'next_check_at' => $this->nextCheckAt($checkedAt, $domain->check_interval_minutes),
        ]);

        return $check;
    }

    private function normalizeTarget(string $target): string
    {
        if (str_starts_with($target, 'http://') || str_starts_with($target, 'https://')) {
            return $target;
        }

        return 'https://'.$target;
    }

    private function nextCheckAt(CarbonInterface $base, int $intervalMinutes): CarbonInterface
    {
        return $base->addMinutes(max(1, $intervalMinutes));
    }
}
