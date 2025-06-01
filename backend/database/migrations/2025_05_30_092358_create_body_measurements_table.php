<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBodyMeasurementsTable extends Migration
{
    public function up()
    {
        Schema::create('body_measurements', function (Blueprint $table) {
            $table->increments('measurement_id');
            $table->unsignedInteger('user_id');
            $table->timestamp('measurement_date')->useCurrent();
            $table->decimal('height_cm', 5, 2)->nullable();
            $table->decimal('weight_kg', 5, 2)->nullable();
            $table->decimal('waist_cm', 5, 2)->nullable();
            $table->decimal('neck_cm', 5, 2)->nullable();
            $table->decimal('hip_cm', 5, 2)->nullable();
            $table->decimal('chest_cm', 5, 2)->nullable();
            $table->decimal('wrist_cm', 5, 2)->nullable();
            $table->decimal('arm_cm', 5, 2)->nullable();
            $table->decimal('thigh_cm', 5, 2)->nullable();
            $table->decimal('ankle_cm', 5, 2)->nullable();
            $table->decimal('skinfold_mm', 5, 2)->nullable();
            $table->string('blood_pressure')->nullable();
            $table->integer('resting_heart_rate')->nullable();
            $table->decimal('blood_glucose', 5, 2)->nullable();
            $table->string('lipid_profile')->nullable();
            $table->string('body_fat_category')->nullable();
            $table->decimal('body_fat_percent', 5, 2)->nullable();
            $table->integer('activity_level')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('body_measurements');
    }
}
