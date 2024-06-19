<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Annonce extends Model
{
    use HasFactory;
    use SoftDeletes ;
    public function images()
{
return $this->hasMany(Image::class);
}



public function visits()
{
return $this->hasMany(Visit::class);
}


public function favoris()
{
return $this->hasMany(Favoris::class);
}

public function secteur()
    {
        return $this->belongsTo(Secteur::class,"id_secteur");
    }

    public function client()
    {
        return $this->belongsTo(Client::class,"id_client");
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class,"id_categorie");
    }
}
