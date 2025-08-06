<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    protected $fillable = [
        'name',
        'reference',
        'cost',
        'selling_price',
        'tracking_type',
        'available_in_pos',
        'total_purchased',
        'total_sold',
        'on_hand_qty',
        'reorder_level',
        'product_type',
        'weight',
        'expire_in_days',
        'expire_notify_in_days',
        'image',
        'description',
        'notes',
        'barcode',
    ];

    // category_id
    // pos_category_id
    // uom_id

}
