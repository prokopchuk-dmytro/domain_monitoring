<?php

namespace App\Http\Requests;

use App\Models\Domain;
use Illuminate\Validation\Rule;

class DomainUpdateRequest extends DomainStoreRequest
{
    /**
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        /** @var Domain $domain */
        $domain = $this->route('domain');

        return [
            'domain' => [
                'required',
                'string',
                'max:255',
                Rule::unique('domains', 'domain')
                    ->where(fn ($query) => $query->where('user_id', $this->user()->id))
                    ->ignore($domain->id),
            ],
            'check_interval_minutes' => ['required', 'integer', 'min:1', 'max:1440'],
            'request_timeout_seconds' => ['required', 'integer', 'min:1', 'max:120'],
            'check_method' => ['required', 'in:get,head'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
