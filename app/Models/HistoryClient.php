<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryClient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'date_sending_message',
        'service',
        'type_service',
        'prestataire_id',
        // Add other fields here
    ];
}
