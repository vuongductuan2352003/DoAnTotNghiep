<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('user_body_progress', function (Blueprint $t) {
            $t->id()->comment('Khóa chính bản ghi lịch sử');
            $t->foreignId('user_id')
              ->constrained()
              ->cascadeOnDelete()
              ->comment('ID người dùng, liên kết với bảng users');

            $t->date('record_date')
              ->comment('Ngày ghi nhận chỉ số');

            $t->unsignedSmallInteger('height_cm')
              ->nullable()
              ->comment('Chiều cao (cm)');

            $t->decimal('weight_kg', 5, 2)
              ->nullable()
              ->comment('Cân nặng (kg)');

            // Chỉ số tính toán
            $t->decimal('bmi', 4, 1)
              ->nullable()
              ->comment('Chỉ số BMI');

            $t->enum('bmi_category', ['underweight','normal','overweight','obese'])
              ->nullable()
              ->comment('Phân loại BMI');

            $t->decimal('bmr', 6, 1)
              ->nullable()
              ->comment('Tỷ lệ trao đổi chất cơ bản (BMR)');

            $t->enum('activity_level', ['sedentary','light','moderate','active','very_active'])
              ->default('sedentary')
              ->comment('Mức độ hoạt động thể chất');

            $t->decimal('baseline_tdee', 6, 1)
              ->nullable()
              ->comment('TDEE cơ bản');

            $t->decimal('body_fat_pct', 5, 2)
              ->nullable()
              ->comment('Tỷ lệ phần trăm mỡ cơ thể');

            $t->decimal('fat_mass_kg', 6, 2)
              ->nullable()
              ->comment('Khối lượng mỡ cơ thể (kg)');

            $t->decimal('lean_mass_kg', 6, 2)
              ->nullable()
              ->comment('Khối lượng cơ không mỡ (kg)');

            $t->decimal('waist_cm', 5, 2)
              ->nullable()
              ->comment('Vòng eo (cm)');

            $t->decimal('hip_cm', 5, 2)
              ->nullable()
              ->comment('Vòng hông (cm)');

            $t->decimal('neck_cm', 5, 2)
              ->nullable()
              ->comment('Vòng cổ (cm)');

            $t->text('notes')
              ->nullable()
              ->comment('Ghi chú thêm');

            $t->timestamps();

            $t->unique(['user_id', 'record_date'], 'ubp_user_date_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_body_progress');
    }
};
