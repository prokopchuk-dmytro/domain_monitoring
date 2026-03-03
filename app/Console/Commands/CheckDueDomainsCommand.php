<?php

namespace App\Console\Commands;

use App\Models\Domain;
use App\Services\DomainMonitorService;
use Illuminate\Console\Command;

class CheckDueDomainsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'domains:check-due';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run checks for all active domains that are due for monitoring';

    /**
     * Execute the console command.
     */
    public function handle(DomainMonitorService $domainMonitorService): int
    {
        $checked = 0;

        Domain::query()
            ->where('is_active', true)
            ->where(function ($query): void {
                $query->whereNull('next_check_at')
                    ->orWhere('next_check_at', '<=', now());
            })
            ->orderBy('id')
            ->lazyById(100)
            ->each(function (Domain $domain) use ($domainMonitorService, &$checked): void {
                $domainMonitorService->check($domain);
                $checked++;
            });

        $this->info("Checked {$checked} domain(s).");

        return self::SUCCESS;
    }
}
