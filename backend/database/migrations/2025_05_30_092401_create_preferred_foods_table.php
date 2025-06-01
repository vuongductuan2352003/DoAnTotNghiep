<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePreferredFoodsTable extends Migration
{
    public function up()
    {
        Schema::create('preferred_foods', function (Blueprint $table) {
            $table->increments('pref_food_id');
            $table->unsignedInteger('food_pref_id');
            $table->string('food_category');
            $table->string('food_item');
            $table->timestamps();

            $table->foreign('food_pref_id')->references('food_pref_id')->on('food_preferences')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('preferred_foods');
    }
}
