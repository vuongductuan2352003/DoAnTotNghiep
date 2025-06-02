<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDailyWorkoutsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('daily_workouts', function (Blueprint $table) {
            $table->increments('daily_workout_id');
            $table->unsignedInteger('plan_id');
            $table->string('day_of_week', 50)->nullable();
            $table->date('workout_date')->nullable();
            $table->string('focus_area', 255)->nullable();
            $table->integer('estimated_duration_minutes')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            // Khóa ngoại đến workout_plans(plan_id)
            $table->foreign('plan_id')
                  ->references('plan_id')
                  ->on('workout_plans')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_workouts');
    }
}
