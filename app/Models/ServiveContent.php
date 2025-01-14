<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiveContent extends Model
{
    use HasFactory;

    protected $fillable = ['service_id', 'titre', 'slogan', 'introduction', 'description', 'imageHeader', 'imageaventage','imageTypeServices'];
    public $table = 'service_content';
    public function services()
    {
        return $this->belongsTo(Services::class);
    }

}
