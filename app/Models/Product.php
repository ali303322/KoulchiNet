<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'category',
        'link',
        'price',
        'image'
    ];

    // Add any additional validation or accessors/mutators if needed
    protected $casts = [
        'price' => 'decimal:2',
    ];
}