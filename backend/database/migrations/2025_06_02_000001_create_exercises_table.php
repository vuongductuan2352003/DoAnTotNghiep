<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExercisesTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exercises', function (Blueprint $table) {
            $table->increments('exercise_id');
            $table->string('exercise_name', 255);
            $table->text('description')->nullable();
            $table->string('muscle_group_primary', 100)->nullable();
            $table->string('muscle_group_secondary', 255)->nullable();
            $table->string('equipment_required', 255)->nullable();
            $table->string('difficulty_level', 50)->nullable();
            $table->string('exercise_type', 100)->nullable();
            $table->string('video_url', 255)->nullable();
            $table->string('image_url', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercises');
    }
}
