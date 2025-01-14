<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Laravel\Sanctum\HasApiTokens;
class Prestataire extends Model implements JWTSubject
{
    use HasApiTokens, HasFactory;

    public function setPasswordAttribute($value)
    {
        // Hash the password only if it's not already hashed
        if (!empty($value)) {
            $this->attributes['password'] = Hash::needsRehash($value)
                ? Hash::make($value)
                : $value;
        }
    }

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        "email_verification_token",
        'password',
        'ville',
        'service_id',
        'description_service',
        'annees_experience',
        'statut',
        'aroundissment',
        // 'disponibilite',
        'email_verified_at'
    ];

    public function histories()
    {
        return $this->hasMany(History::class,'prestataire_id');
    }



    public function getJWTIdentifier()
    {
        return $this->getKey(); // Cela renvoie l'identifiant unique de l'utilisateur (par défaut la clé primaire)
    }

    /**
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return []; // Retourne des informations supplémentaires à inclure dans le token
    }

    public function documents()
    {
        return $this->hasMany(Document::class , 'id_prestataire');
    }

    public function Disponibility()
    {
        return $this->hasMany(Disponibility::class);
    }

    public function Client()
    {
        return $this->belongsTo(Client::class);
    }

    public function service()
    {
        return $this->belongsTo(Services::class,'service_id');
    }
    public function review()
    {
        return $this->hasMany(Review::class);
    }
}
