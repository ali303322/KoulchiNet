<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class Prestataire extends Model
{
    use HasFactory;

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
        'aroundissment',
        'disponibilite',
        'email_verified_at'
    ];
}
