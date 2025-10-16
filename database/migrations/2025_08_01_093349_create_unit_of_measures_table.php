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
        Schema::create('stock_unit_of_measures', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('rounding', 10, 2)->default(0.01);
            $table->foreignId('create_uid')->constrained('res_users');
            $table->foreignId('write_uid')->constrained('res_users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unit_of_measures');
    }
};
