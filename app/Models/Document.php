<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_prestataire',
        'diplome_sertificat',
        'photo',
    ];
}