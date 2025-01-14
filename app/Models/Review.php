<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = ['prestataire_id','NbrStars','commentaire'];


    public function prestataire()
    {
        return $this->belongsTo(Prestataire::class);
    }


}
