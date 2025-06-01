<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectedHealthMetricsTable extends Migration
{
    public function up()
    {
        Schema::create('projected_health_metrics', function (Blueprint $table) {
            $table->increments('projected_metric_id');
            $table->unsignedInteger('user_id');
            $table->timestamp('calculation_date')->useCurrent();
            $table->decimal('bmi_projected', 5, 2)->nullable();
            $table->integer('bmr_projected')->nullable();
            $table->integer('tdee_projected')->nullable();
            $table->decimal('body_fat_pct_projected', 5, 2)->nullable();
            $table->decimal('fat_mass_kg_projected', 5, 2)->nullable();
            $table->decimal('lean_mass_kg_projected', 5, 2)->nullable();
            $table->text('improve_risk')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('projected_health_metrics');
    }
}
