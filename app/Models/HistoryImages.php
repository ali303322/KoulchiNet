<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryImages extends Model
{
    use HasFactory;

    protected $fillable = ['history_id', 'image'];

    public function history()
    {
        return $this->belongsTo(History::class);
    }
}
