<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SousService extends Model
{

    use HasFactory;

    protected $fillable = ['nom', 'category_id'];


    public function services()
    {
        return $this->belongsTo(Services::class);
    }
}
