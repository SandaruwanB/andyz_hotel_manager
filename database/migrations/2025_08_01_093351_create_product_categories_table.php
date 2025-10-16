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
        Schema::create('stock_product_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->unsignedBigInteger('income_account_id')->nullable();
            $table->unsignedBigInteger('expense_account_id')->nullable();
            $table->foreignId('parent_category_id')->constrained('stock_product_categories')->onDelete('cascade');
            $table->string('costing_method')->default('fifo'); // fifo, average standard
            $table->string('inventory_valuation')->default('automated'); // manual, automated
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
        Schema::dropIfExists('product_categories');
    }
};
