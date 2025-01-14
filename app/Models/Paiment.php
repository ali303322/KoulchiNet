<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiment extends Model
{
    use HasFactory ;


    protected $fillable = ['prestataire_id','NbrOffres','NomOffre','recipteImage','prix'];


    // Paiment.php
    public function prestataire()
    {
        return $this->belongsTo(Prestataire::class, 'prestataire_id');
    }

}
