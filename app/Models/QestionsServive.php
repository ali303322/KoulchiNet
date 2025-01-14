<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class QestionsServive extends Model
{
    use HasFactory;

    protected $fillable = ['service_id', 'questions', 'reponse'];
    public $table = 'qestions_service';

    public function services()
    {
        return $this->belongsTo(Services::class);
    }


}
