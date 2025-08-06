<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class customer extends Model
{
    protected $fillable = [
        'name',
        'full_name',
        'calling_name',
        'nic',
        'email',
        'mobile',
        'phone',
        'address_line_1',
        'address_line_2',
        'city',
        'province',
        'country',
        'postal_code',
        'status',
        'title',
        'job',
        'image',
        'notes',
        'age',
        'birth_date',
    ];

    // bookings history
    // customer respoinible (relations details)

}
