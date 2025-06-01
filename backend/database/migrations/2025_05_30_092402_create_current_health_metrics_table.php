<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCurrentHealthMetricsTable extends Migration
{
    public function up()
    {
        Schema::create('current_health_metrics', function (Blueprint $table) {
            $table->increments('metric_id');
            $table->unsignedInteger('user_id');
            $table->timestamp('measurement_date')->useCurrent();
            $table->decimal('bmi', 5, 2)->nullable();
            $table->integer('bmr')->nullable();
            $table->integer('tdee')->nullable();
            $table->decimal('body_fat_pct', 5, 2)->nullable();
            $table->decimal('fat_mass_kg', 5, 2)->nullable();
            $table->decimal('lean_mass_kg', 5, 2)->nullable();
            $table->decimal('waist_hip_ratio', 5, 2)->nullable();
            $table->text('advice')->nullable();
            $table->text('risks')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('current_health_metrics');
    }
}
