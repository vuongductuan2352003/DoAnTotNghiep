<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExerciseLogTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exercise_log', function (Blueprint $table) {
            $table->increments('exercise_log_id');
            $table->unsignedInteger('log_id');
            $table->unsignedInteger('workout_exercise_id');
            $table->integer('set_number')->nullable();
            $table->string('reps_actual', 50)->nullable();
            $table->decimal('weight_kg_actual', 5, 2)->nullable();
            $table->integer('duration_minutes_actual')->nullable();
            $table->decimal('distance_km_actual', 5, 2)->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_successful')->default(true);
            $table->timestamps();

            // Khóa ngoại đến workout_logs(log_id)
            $table->foreign('log_id')
                  ->references('log_id')
                  ->on('workout_logs')
                  ->onDelete('cascade');

            // Khóa ngoại đến workout_exercises(workout_exercise_id)
            $table->foreign('workout_exercise_id')
                  ->references('workout_exercise_id')
                  ->on('workout_exercises')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercise_log');
    }
}
