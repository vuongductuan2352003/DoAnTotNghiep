<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgressPhotosTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('progress_photos', function (Blueprint $table) {
            $table->increments('photo_id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('daily_workout_id')->nullable();
            $table->date('photo_date');
            $table->string('image_url', 255);
            $table->text('notes')->nullable();
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
        Schema::dropIfExists('progress_photos');
    }
}
