<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('workout_sessions', function (Blueprint $t) {
            $t->id();
            $t->foreignId('user_id')->constrained()->cascadeOnDelete();

            $t->dateTime('session_date');                // thời điểm bắt đầu buổi tập
            $t->unsignedSmallInteger('duration_min')     // tổng phút (nullable = chưa kết thúc)
                  ->nullable();
            $t->tinyInteger('perceived_intensity')       // RPE 1-10 (nullable nếu user không nhập)
                  ->nullable();
            $t->text('notes')->nullable();               // “mệt”, “đau vai” …

            // Nếu buổi tập sinh tự động từ plan:
            $t->foreignId('generated_plan_id')           // nullable
                  ->nullable()
                  ->constrained('user_meal_plans')
                  ->nullOnDelete();

            $t->timestamps();
            $t->index(['user_id', 'session_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('workout_sessions');
    }
};
