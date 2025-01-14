<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AventageServive extends Model
{
    use HasFactory;

    protected $fillable = ['service_id', 'Aventage'];
    public $table = 'aventages_service';
    public function services()
    {
        return $this->belongsTo(Services::class);
    }
}
