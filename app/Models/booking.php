<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class booking extends Model
{
    protected $fillable = [
        'booking_code',
        'status',
        'check_in_date',
        'check_out_date',
        'booked_date',
    ];

    // customer_id
    // product_id
    // booking_type_id
    // foods and beverages lines
}
