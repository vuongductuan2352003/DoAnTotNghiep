<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bmi_categories', function (Blueprint $table) {
            $table->id();
            $table->string('category_label', 50)->unique()->comment('Tên phân loại BMI (ví dụ: Gầy độ III, Thừa cân, ...)');
            $table->decimal('bmi_min', 5, 2)->nullable()->comment('Giá trị BMI tối thiểu (NULL nếu không giới hạn)');
            $table->decimal('bmi_max', 5, 2)->nullable()->comment('Giá trị BMI tối đa (NULL nếu không giới hạn)');
            $table->json('risk_male')->comment('Danh sách nguy cơ cho Nam (JSON array)');
            $table->json('risk_female')->comment('Danh sách nguy cơ cho Nữ (JSON array)');
            $table->json('advice_male')->comment('Danh sách lời khuyên cho Nam (JSON array)');
            $table->json('advice_female')->comment('Danh sách lời khuyên cho Nữ (JSON array)');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bmi_categories');
    }
};
