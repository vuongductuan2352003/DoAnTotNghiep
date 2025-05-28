<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('user_goals', function (Blueprint $t) {
            $t->id();
            $t->foreignId('user_id')->constrained()->cascadeOnDelete();

            $t->enum('primary_goal', ['lose_weight','muscle_gain','maintain'])
              ->default('maintain');
            $t->decimal('target_weight_kg', 5, 2)->nullable();
            $t->date('target_date')->nullable();
            $t->json('secondary_goals')->nullable();   // JSON mảng mục tiêu phụ

            $t->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_goals');
    }
};
