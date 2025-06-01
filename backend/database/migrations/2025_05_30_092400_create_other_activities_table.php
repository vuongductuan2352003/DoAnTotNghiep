<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOtherActivitiesTable extends Migration
{
    public function up()
    {
        Schema::create('other_activities', function (Blueprint $table) {
            $table->increments('other_activity_id');
            $table->unsignedInteger('preference_id');
            $table->string('activity_name');
            $table->timestamps();

            $table->foreign('preference_id')->references('preference_id')->on('training_preferences')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('other_activities');
    }
}
