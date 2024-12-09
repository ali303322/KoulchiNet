<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

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
}
