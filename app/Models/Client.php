<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
class Client extends Authenticatable implements JWTSubject
{
    use HasApiTokens,HasFactory;

    // Define which attributes are mass assignable
    protected $fillable = [
        'prenom', // Add 'prenom' here
        'nom',
        'email',
        'telephone',
        'password',
        'ville',
        'aroundissment',
        'photo_profel',
        'email_verification_token',
    ];

    public function histories()
    {
        return $this->hasMany(History::class,'client_id');
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
}
