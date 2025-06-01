<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFoodPreferencesTable extends Migration
{
    public function up()
    {
        Schema::create('food_preferences', function (Blueprint $table) {
            $table->increments('food_pref_id');
            $table->unsignedInteger('user_id');
            $table->string('diet_type')->nullable();
            $table->string('meal_time_duration')->nullable();
            $table->boolean('auto_choose_food')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('food_preferences');
    }
}
