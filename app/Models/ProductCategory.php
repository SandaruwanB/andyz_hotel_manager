<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $fillable = [
        'name',
        'description',
        'income_account_id',
        'expense_account_id',
        'parent_category_id',
        'costing_method', // fifo, average standard
        'inventory_valuation', // manual, automated
        'create_uid',
        'write_uid'
    ];


    public function parent_category(){
        return $this->belongsTo(ProductCategory::class, 'parent_category_id');
    }
}
