<?php

namespace Tests\Feature;

use App\Models\Domain;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class DomainChecksCommandTest extends TestCase
{
    use RefreshDatabase;

    public function test_due_domains_are_checked_by_command(): void
    {
        Http::fake([
            'https://example.com' => Http::response('', 200),
        ]);

        $domain = Domain::factory()
            ->for(User::factory()->create())
            ->create([
                'domain' => 'example.com',
                'check_method' => 'head',
                'next_check_at' => now()->subMinute(),
            ]);

        $this->artisan('domains:check-due')
            ->assertExitCode(0);

        $this->assertDatabaseHas('domain_checks', [
            'domain_id' => $domain->id,
            'status' => 'up',
            'response_code' => 200,
        ]);
    }
}
