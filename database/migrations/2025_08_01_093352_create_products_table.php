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
        Schema::create('stock_products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('reference')->nullable();
            $table->boolean('allow_sale')->default(true);
            $table->boolean('allow_purchase')->default(true);
            $table->boolean('allow_pos')->default(true);
            $table->boolean('expense_item')->default(false);
            $table->string('track_inventory')->default('none'); // none, by lot, by serial
            $table->boolean('allow_negative_stock')->default(false);
            $table->foreignId('uom_id')->constrained('stock_unit_of_measures');
            $table->decimal('cost', 15, 4)->default(0);
            $table->decimal('selling_price', 15, 4)->default(1);
            $table->string('tracking_type')->nullable();
            $table->boolean('available_in_pos')->default(true);
            $table->integer('total_purchased')->default(0);
            $table->integer('total_sold')->default(0);
            $table->integer('on_hand_qty')->default(0);
            $table->integer('reorder_level')->default(0);
            $table->string('product_type')->default('storable'); // service, consumable, storable
            $table->decimal('weight', 15, 4)->default(0);
            $table->decimal('height', 15, 4)->default(0);
            $table->decimal('width', 15, 4)->default(0);
            $table->integer('expire_in_days')->nullable();
            $table->integer('expire_notify_in_days')->nullable();
            $table->json('image')->nullable();
            $table->text('description')->nullable();
            $table->text('notes')->nullable();
            $table->string('barcode')->nullable();
            $table->foreignId('category_id')->constrained('stock_product_categories');
            $table->foreignId('pos_category_id')->constrained('stock_pos_categories');
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
        Schema::dropIfExists('products');
    }
};
