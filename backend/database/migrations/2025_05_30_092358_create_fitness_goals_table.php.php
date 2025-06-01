<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFitnessGoalsTable extends Migration
{
    public function up()
    {
        Schema::create('fitness_goals', function (Blueprint $table) {
            $table->increments('goal_id');
            $table->unsignedInteger('user_id');
            $table->string('goal_type');
            $table->decimal('target_weight_kg', 5, 2)->nullable();
            $table->date('target_date')->nullable();
            $table->string('fitness_level')->nullable();
            $table->integer('activity_level_projected')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('fitness_goals');
    }
}
