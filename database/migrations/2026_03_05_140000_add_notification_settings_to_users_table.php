<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->string('notification_email')->nullable()->after('email');
            $table->string('telegram_chat_id')->nullable()->after('notification_email');
            $table->boolean('email_notifications_enabled')->default(true)->after('telegram_chat_id');
            $table->boolean('telegram_notifications_enabled')->default(false)->after('email_notifications_enabled');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn([
                'notification_email',
                'telegram_chat_id',
                'email_notifications_enabled',
                'telegram_notifications_enabled',
            ]);
        });
    }
};
