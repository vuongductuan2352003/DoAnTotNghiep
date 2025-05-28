<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('user_meal_items', function (Blueprint $t) {
            $t->id();
            $t->foreignId('user_meal_plan_id')->constrained('user_meal_plans')
              ->cascadeOnDelete();
            $t->foreignId('food_item_id')->constrained()->cascadeOnDelete();

            $t->enum('meal_type', ['breakfast','lunch','dinner','snack']);
            $t->unsignedSmallInteger('quantity_g');           // gram thực phẩm

            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_meal_items');
    }
};
