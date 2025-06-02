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
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('post_id');

            // Khóa ngoại đến user (tác giả)
            $table->unsignedInteger('user_id')->index();

            // Nội dung văn bản
            $table->text('content')->nullable();

            // Lưu array JSON các đường dẫn hình (nếu có)
            $table->json('images')->nullable();

            // Lưu array JSON các đường dẫn video (nếu có)
            $table->json('videos')->nullable();

            // Quyền riêng tư: public, private (chỉ mình tôi), followers (chỉ followers)
            $table->enum('privacy', ['public', 'private', 'followers'])
                  ->default('public')
                  ->comment('public: công khai; private: chỉ mình tôi; followers: chỉ followers');

            // Thống kê: số tim (hearts) và số bình luận
            $table->integer('heart_count')->default(0);
            $table->integer('comments_count')->default(0);

            // Timestamps
            $table->timestamps();

            // Khóa ngoại ràng buộc:
            $table->foreign('user_id')
                  ->references('user_id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
