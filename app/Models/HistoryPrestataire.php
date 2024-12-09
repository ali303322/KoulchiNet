<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryPrestataire extends Model
{
    use HasFactory;

    // Fillable properties (fields that can be mass-assigned)
    protected $fillable = [
        'client_id',
        'name',
        'date_sending_message',
        'type_service',
        'service',
        'prestataire_id',

        // Add other fields here
    ];
}
