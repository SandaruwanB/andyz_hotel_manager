<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    protected $fillable = [
        'name',
        'reference',
        'allow_sale',
        'allow_purchase',
        'allow_pos',
        'expense_item',
        'track_inventory', // none, by lot, by serial
        'allow_negative_stock',
        'uom_id',
        'cost',
        'selling_price',
        'tracking_type', // fifo, average
        'available_in_pos',
        'total_purchased',
        'total_sold',
        'on_hand_qty',
        'reorder_level',
        'product_type', // service, consumable, storable
        'weight',
        'height',
        'width',
        'expire_in_days',
        'expire_notify_in_days',
        'image',
        'description',
        'notes',
        'barcode',
        'category_id',
        'pos_category_id',
        'create_uid',
        'write_uid',
    ];



    public function category(){
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }

    public function pos_category(){
        return $this->belongsTo(PosCategory::class, 'pos_category_id');
    }

    public function uom(){
        return $this->belongsTo(UnitOfMeasure::class, 'uom_id');
    }

}
