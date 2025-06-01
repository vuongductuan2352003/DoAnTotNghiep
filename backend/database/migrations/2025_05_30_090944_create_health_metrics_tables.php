<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 2. Bảng số đo cơ thể (body_measurements)
        Schema::create('body_measurements', function (Blueprint $table) {
            $table->increments('measurement_id');
            $table->integer('user_id')->unsigned(); // unsigned() cho foreign key
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
            $table->string('blood_pressure', 50)->nullable();
            $table->integer('resting_heart_rate')->nullable();
            $table->decimal('blood_glucose', 5, 2)->nullable();
            $table->string('lipid_profile', 50)->nullable();
            $table->string('body_fat_category', 100)->nullable();
            $table->decimal('body_fat_percent', 5, 2)->nullable();
            $table->integer('activity_level')->nullable();
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->timestamps(); // Thêm timestamps cho created_at và updated_at
        });

        // 3. Bảng mục tiêu tập luyện (fitness_goals)
        Schema::create('fitness_goals', function (Blueprint $table) {
            $table->increments('goal_id');
            $table->integer('user_id')->unsigned();
            $table->string('goal_type', 100);
            $table->decimal('target_weight_kg', 5, 2)->nullable();
            $table->date('target_date')->nullable();
            $table->string('fitness_level', 100)->nullable();
            $table->integer('activity_level_projected')->nullable();
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });

        // 14. Bảng chỉ số sức khỏe hiện tại (current_health_metrics)
        Schema::create('current_health_metrics', function (Blueprint $table) {
            $table->increments('metric_id');
            $table->integer('user_id')->unsigned();
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
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });

        // 15. Bảng chỉ số sức khỏe mục tiêu (projected_health_metrics)
        Schema::create('projected_health_metrics', function (Blueprint $table) {
            $table->increments('projected_metric_id');
            $table->integer('user_id')->unsigned();
            $table->timestamp('calculation_date')->useCurrent();
            $table->decimal('bmi_projected', 5, 2)->nullable();
            $table->integer('bmr_projected')->nullable();
            $table->integer('tdee_projected')->nullable();
            $table->decimal('body_fat_pct_projected', 5, 2)->nullable();
            $table->decimal('fat_mass_kg_projected', 5, 2)->nullable();
            $table->decimal('lean_mass_kg_projected', 5, 2)->nullable();
            $table->text('improve_risk')->nullable(); // Đổi tên cột từ risk_improvements_plan
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projected_health_metrics');
        Schema::dropIfExists('current_health_metrics');
        Schema::dropIfExists('fitness_goals');
        Schema::dropIfExists('body_measurements');
    }
};