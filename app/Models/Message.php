<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'messages';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'client_id',
        'prestataire_id',
        'message',
        'audio',
        'file',
        'sender',
    ];

    /**
     * Relationship with the Client model.
     */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * Relationship with the Prestataire model.
     */
    public function prestataire()
    {
        return $this->belongsTo(Prestataire::class);
    }
}