<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Domain>
 */
class DomainFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'domain' => fake()->unique()->domainName(),
            'check_interval_minutes' => fake()->numberBetween(1, 30),
            'request_timeout_seconds' => fake()->numberBetween(2, 10),
            'check_method' => fake()->randomElement(['get', 'head']),
            'is_active' => true,
            'next_check_at' => now(),
        ];
    }
}
