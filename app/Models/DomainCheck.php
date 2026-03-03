<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DomainCheck extends Model
{
    /** @use HasFactory<\Database\Factories\DomainCheckFactory> */
    use HasFactory;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'domain_id',
        'status',
        'response_code',
        'response_time_ms',
        'error',
        'checked_at',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'checked_at' => 'datetime',
        ];
    }

    public function domain(): BelongsTo
    {
        return $this->belongsTo(Domain::class);
    }
}
