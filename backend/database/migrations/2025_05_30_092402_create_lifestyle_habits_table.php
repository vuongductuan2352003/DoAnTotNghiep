<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLifestyleHabitsTable extends Migration
{
    public function up()
    {
        Schema::create('lifestyle_habits', function (Blueprint $table) {
            $table->increments('habit_id');
            $table->unsignedInteger('user_id');
            $table->string('sugar_habit')->nullable();
            $table->string('water_intake')->nullable();
            $table->string('sleep_hours')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('lifestyle_habits');
    }
}
