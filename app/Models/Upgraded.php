<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Upgraded extends Model
{
    protected $fillable = ['prestataire_id','NbrOffres','NomOffre','recipteImage','prix'];

    protected $table = 'upgraded';

    // Paiment.php
    public function prestataire()
    {
        return $this->belongsTo(Prestataire::class, 'prestataire_id');
    }
}
