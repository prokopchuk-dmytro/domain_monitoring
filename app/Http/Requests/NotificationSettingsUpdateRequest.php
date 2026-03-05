<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NotificationSettingsUpdateRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        $this->merge([
            'email_notifications_enabled' => $this->boolean('email_notifications_enabled'),
            'telegram_notifications_enabled' => $this->boolean('telegram_notifications_enabled'),
            'notification_email' => $this->filled('notification_email')
                ? trim((string) $this->input('notification_email'))
                : null,
            'telegram_chat_id' => $this->filled('telegram_chat_id')
                ? trim((string) $this->input('telegram_chat_id'))
                : null,
        ]);
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
            'notification_email' => ['nullable', 'email', 'max:255'],
            'telegram_chat_id' => ['nullable', 'string', 'max:255'],
            'email_notifications_enabled' => ['required', 'boolean'],
            'telegram_notifications_enabled' => ['required', 'boolean'],
        ];
    }
}
