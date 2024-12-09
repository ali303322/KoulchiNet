<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arrondissement extends Model
{
    use HasFactory;

    // Nom de la table dans la base de données
    protected $table = 'arrondissements';

    // Définir la relation inverse (l'arrondissement appartient à une ville)
    public function ville()
    {
        return $this->belongsTo(Ville::class, 'ville_id');
    }
}
