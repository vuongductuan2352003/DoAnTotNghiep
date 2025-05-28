<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('food_items', function (Blueprint $t) {
            $t->id();
            $t->string('name')->unique();
            $t->unsignedSmallInteger('calories_per_100g');  // kcal
            $t->decimal('protein_g', 5, 2);
            $t->decimal('carb_g',    5, 2);
            $t->decimal('fat_g',     5, 2);
            $t->json('tags')->nullable();                  // ["grain","vegan"]
            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('food_items');
    }
};
