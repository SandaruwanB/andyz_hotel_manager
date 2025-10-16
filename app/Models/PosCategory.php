<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PosCategory extends Model
{
    protected $fillable = [
        'name',
        'description',
        'image',
        'create_uid',
        'write_uid'
    ];
}
