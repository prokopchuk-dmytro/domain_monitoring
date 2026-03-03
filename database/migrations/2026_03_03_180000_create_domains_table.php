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
        Schema::create('domains', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('domain');
            $table->unsignedInteger('check_interval_minutes')->default(5);
            $table->unsignedInteger('request_timeout_seconds')->default(10);
            $table->enum('check_method', ['get', 'head'])->default('head');
            $table->boolean('is_active')->default(true);
            $table->enum('last_status', ['up', 'down', 'error'])->nullable();
            $table->unsignedSmallInteger('last_response_code')->nullable();
            $table->unsignedInteger('last_response_time_ms')->nullable();
            $table->text('last_error')->nullable();
            $table->timestamp('last_checked_at')->nullable();
            $table->timestamp('next_check_at')->nullable()->index();
            $table->timestamps();

            $table->unique(['user_id', 'domain']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('domains');
    }
};
