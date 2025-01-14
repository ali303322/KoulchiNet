<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Services extends Model
{

    use HasFactory;

    protected $fillable = ['serviceName', 'category_id','icon','PRO'];

    /**
     * Relation avec la catégorie.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function sousServices()
    {
        return $this->hasMany(SousService::class,'service_id');
    }

    public function serviceContent()
    {
        return $this->hasMany(ServiveContent::class,'service_id');
    }
    public function aventagesService()
    {
        return $this->hasMany(AventageServive::class,'service_id');
    }
    public function questionService()
    {
        return $this->hasMany(QestionsServive::class,'service_id');
    }
    public function pncs()
    {
        return $this->hasMany(PNC::class,'service_id');
    }
}
