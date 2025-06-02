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
        Schema::create('follows', function (Blueprint $table) {
            $table->bigIncrements('id');
            // Ai follow (follower_id)
            $table->unsignedInteger('follower_id')->index();
            // Đang được follow (followee_id)
            $table->unsignedInteger('followee_id')->index();
            $table->timestamps();

            // Khóa ngoại:
            $table->foreign('follower_id')
                  ->references('user_id')
                  ->on('users')
                  ->onDelete('cascade');

            $table->foreign('followee_id')
                  ->references('user_id')
                  ->on('users')
                  ->onDelete('cascade');

            // Mỗi cặp follow chỉ lưu 1 lần duy nhất
            $table->unique(['follower_id', 'followee_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('follows');
    }
};
