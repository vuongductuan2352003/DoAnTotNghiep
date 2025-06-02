<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorkoutExercisesTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('workout_exercises', function (Blueprint $table) {
            $table->increments('workout_exercise_id');
            $table->unsignedInteger('daily_workout_id');
            $table->unsignedInteger('exercise_id');
            $table->integer('set_number')->nullable();
            $table->string('reps', 50)->nullable();
            $table->decimal('weight_kg', 5, 2)->nullable();
            $table->integer('duration_minutes')->nullable();
            $table->decimal('distance_km', 5, 2)->nullable();
            $table->integer('rest_time_seconds')->nullable();
            $table->integer('order_in_workout')->nullable();
            $table->timestamps();

            // Khóa ngoại đến daily_workouts(daily_workout_id)
            $table->foreign('daily_workout_id')
                  ->references('daily_workout_id')
                  ->on('daily_workouts')
                  ->onDelete('cascade');

            // Khóa ngoại đến exercises(exercise_id)
            $table->foreign('exercise_id')
                  ->references('exercise_id')
                  ->on('exercises')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workout_exercises');
    }
}
