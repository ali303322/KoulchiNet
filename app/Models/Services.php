<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Services extends Model
{

    use HasFactory;

    use HasFactory;

    // Add id_prestataire to the fillable array
    protected $fillable = [
        'id_prestataire', // Add this line
        'name_service',
        'description_service',
        'annees_experience',
        'statut',
        "category_id",
    ];
    

    /**
     * Relation avec la catégorie.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function sousServices()
    {
        return $this->hasMany(SousService::class);
    }
}
