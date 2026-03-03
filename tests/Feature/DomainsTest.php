<?php

namespace Tests\Feature;

use App\Models\Domain;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DomainsTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_see_domains_page(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/domains');

        $response->assertOk();
    }

    public function test_user_can_create_domain(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->post('/domains', [
            'domain' => 'example.com',
            'check_interval_minutes' => 5,
            'request_timeout_seconds' => 10,
            'check_method' => 'head',
            'is_active' => 'on',
        ])->assertRedirect();

        $this->assertDatabaseHas('domains', [
            'user_id' => $user->id,
            'domain' => 'example.com',
            'check_method' => 'head',
        ]);
    }

    public function test_user_cannot_delete_foreign_domain(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $domain = Domain::factory()->for($owner)->create();

        $this->actingAs($otherUser)
            ->delete("/domains/{$domain->id}")
            ->assertNotFound();
    }
}
