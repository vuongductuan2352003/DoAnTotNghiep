<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWeeklySessionsTable extends Migration
{
    public function up()
    {
        Schema::create('weekly_sessions', function (Blueprint $table) {
            $table->increments('session_id');
            $table->unsignedInteger('preference_id');
            $table->string('day_of_week');
            $table->timestamps();

            $table->foreign('preference_id')->references('preference_id')->on('training_preferences')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('weekly_sessions');
    }
}
