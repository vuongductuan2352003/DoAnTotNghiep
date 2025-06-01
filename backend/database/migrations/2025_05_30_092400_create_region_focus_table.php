<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegionFocusTable extends Migration
{
    public function up()
    {
        Schema::create('region_focus', function (Blueprint $table) {
            $table->increments('region_id');
            $table->unsignedInteger('preference_id');
            $table->string('focus_area');
            $table->timestamps();

            $table->foreign('preference_id')->references('preference_id')->on('training_preferences')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('region_focus');
    }
}
