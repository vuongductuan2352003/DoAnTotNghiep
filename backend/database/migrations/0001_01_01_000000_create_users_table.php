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
        Schema::create('users', function (Blueprint $table) {
             $table->increments('user_id');

        // Cá nhân
        $table->string('username', 30)->unique();
        $table->string('name', 255);
        $table->text('bio')->nullable();
        $table->string('avatar_path', 255)->nullable();
        $table->string('website', 255)->nullable();
        $table->boolean('is_private')->default(false);

        // Thống kê
        $table->integer('followers_count')->default(0);
        $table->integer('following_count')->default(0);
        $table->integer('posts_count')->default(0);

        // Thông tin cá nhân
        $table->date('birth')->nullable();
        $table->string('email', 255)->unique();
        $table->timestamp('email_verified_at')->nullable();
         $table->string('gender')->nullable();
            $table->integer('age')->nullable();
        // Bảo mật
        $table->string('password', 255)->nullable();
        $table->rememberToken();

        // Role, timestamp
        $table->enum('role', ['admin','user'])->default('user');
        $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
