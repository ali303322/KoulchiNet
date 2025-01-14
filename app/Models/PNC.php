<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PNC extends Model
{
    use HasFactory;


    protected $table = 'pncs';

    protected $fillable = ['service_id','porQouiNousChoisire'];

    public function services()
    {
        return $this->belongsTo(Services::class);
    }
}
