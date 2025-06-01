<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrainingPreferencesTable extends Migration
{
    public function up()
    {
        Schema::create('training_preferences', function (Blueprint $table) {
            $table->increments('preference_id');
            $table->unsignedInteger('user_id');
            $table->string('location')->nullable();
            $table->string('training_frequency_past')->nullable();
            $table->string('duration_minutes')->nullable();
            $table->string('time_preference')->nullable();
            $table->string('pushups_range')->nullable();
            $table->string('pullups_ability')->nullable();
            $table->string('daily_routine')->nullable();
            $table->text('injuries')->nullable();
            $table->text('problems')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('training_preferences');
    }
}
