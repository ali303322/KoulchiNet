<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ville extends Model
{
    use HasFactory;

        // Déclare les colonnes modifiables
        protected $fillable = [
            'region',
            'ville',
            'villePrincipale',
        ];

        public function arrondissements()
        {
            return $this->hasMany(Arrondissement::class, 'ville_id');
        }

}
