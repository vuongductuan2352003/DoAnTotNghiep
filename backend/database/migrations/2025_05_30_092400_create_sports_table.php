<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSportsTable extends Migration
{
    public function up()
    {
        Schema::create('sports', function (Blueprint $table) {
            $table->increments('sport_id');
            $table->unsignedInteger('preference_id');
            $table->string('sport_name');
            $table->timestamps();

            $table->foreign('preference_id')->references('preference_id')->on('training_preferences')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('sports');
    }
}
