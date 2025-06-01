<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrainingActivitiesTable extends Migration
{
    public function up()
    {
        Schema::create('training_activities', function (Blueprint $table) {
            $table->increments('activity_detail_id');
            $table->unsignedInteger('preference_id');
            $table->string('activity_name');
            $table->boolean('is_liked')->nullable();
            $table->timestamps();

            $table->foreign('preference_id')->references('preference_id')->on('training_preferences')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('training_activities');
    }
}
