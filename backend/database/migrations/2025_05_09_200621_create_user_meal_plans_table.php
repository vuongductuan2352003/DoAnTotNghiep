<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('user_meal_plans', function (Blueprint $t) {
            $t->id();
            $t->foreignId('user_id')->constrained()->cascadeOnDelete();

            $t->date('plan_date');                            // ngày áp dụng
            $t->unsignedSmallInteger('total_calories');       // kcal
            $t->json('macros');                               // {"protein":160,"carb":250,"fat":60}

            $t->timestamps();
            $t->unique(['user_id', 'plan_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_meal_plans');
    }
};

