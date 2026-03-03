<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DomainStoreRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        if ($this->has('is_active')) {
            $this->merge([
                'is_active' => filter_var(
                    $this->input('is_active'),
                    FILTER_VALIDATE_BOOLEAN,
                    FILTER_NULL_ON_FAILURE,
                ) ?? true,
            ]);
        }
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'domain' => [
                'required',
                'string',
                'max:255',
                Rule::unique('domains', 'domain')->where(
                    fn ($query) => $query->where('user_id', $this->user()->id),
                ),
            ],
            'check_interval_minutes' => ['required', 'integer', 'min:1', 'max:1440'],
            'request_timeout_seconds' => ['required', 'integer', 'min:1', 'max:120'],
            'check_method' => ['required', 'in:get,head'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function validated($key = null, $default = null): mixed
    {
        $validated = parent::validated($key, $default);

        if (is_array($validated) && array_key_exists('domain', $validated)) {
            $validated['domain'] = strtolower(trim((string) $validated['domain']));
        }

        return $validated;
    }
}
