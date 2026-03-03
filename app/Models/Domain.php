<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Domain extends Model
{
    /** @use HasFactory<\Database\Factories\DomainFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'domain',
        'check_interval_minutes',
        'request_timeout_seconds',
        'check_method',
        'is_active',
        'last_status',
        'last_response_code',
        'last_response_time_ms',
        'last_error',
        'last_checked_at',
        'next_check_at',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'last_checked_at' => 'datetime',
            'next_check_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function checks(): HasMany
    {
        return $this->hasMany(DomainCheck::class);
    }

    public function latestCheck(): HasOne
    {
        return $this->hasOne(DomainCheck::class)->latestOfMany('checked_at');
    }
}
