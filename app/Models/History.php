<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class History extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id', 'prestataire_id', 'type_service', 'service_name', 'date_sent' , 'niveauDurgence' , 'description' , 'date', 'time'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function prestataire()
    {
        return $this->belongsTo(Prestataire::class);
    }
    public function images()
    {
        return $this->hasMany(HistoryImages::class);
    }

}
