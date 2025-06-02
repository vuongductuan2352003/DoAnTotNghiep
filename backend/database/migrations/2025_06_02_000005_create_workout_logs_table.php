<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorkoutLogsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('workout_logs', function (Blueprint $table) {
            $table->increments('log_id');
            // Kích thước của users.user_id (INT UNSIGNED), nên dùng unsignedInteger()
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('daily_workout_id');
            $table->date('workout_date');
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->integer('duration_minutes_actual')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_completed')->default(false);
            $table->timestamps();

            // Khóa ngoại đến users(user_id)
            $table->foreign('user_id')
                  ->references('user_id')
                  ->on('users')
                  ->onDelete('cascade');

            // Khóa ngoại đến daily_workouts(daily_workout_id)
            $table->foreign('daily_workout_id')
                  ->references('daily_workout_id')
                  ->on('daily_workouts')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workout_logs');
    }
}
