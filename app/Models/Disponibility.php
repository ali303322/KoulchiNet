<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disponibility extends Model
{
    use HasFactory;

      // Nom de la table associée
      protected $table = 'disponibility';

      // Attributs pouvant être remplis via des formulaires ou des méthodes
      protected $fillable = [
          'prestataire_id',
          'jour',
          'debut',
          'fin',
      ];

      /**
       * Relation avec le modèle Prestataire.
       * Une disponibilité appartient à un prestataire.
       */
      public function prestataire()
      {
          return $this->belongsTo(Prestataire::class, 'prestataire_id');
      }

      /**
       * Accesseur pour formater les plages horaires (optionnel).
       * Exemple : "12:00 - 16:00"
       */
      public function getPlageHoraireAttribute()
      {
          return $this->debut . ' - ' . $this->fin;
      }


}
