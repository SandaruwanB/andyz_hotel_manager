<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnitOfMeasure extends Model
{
    protected $fillable = [
        'name',
        'rounding',
        'create_uid',
        'write_uid'
    ];
}
