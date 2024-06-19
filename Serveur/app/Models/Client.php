<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable; 
use Laravel\Sanctum\HasApiTokens;

class Client extends Authenticatable
{
    use HasFactory;
    use SoftDeletes ;
    use HasApiTokens ;
    public function ville()
    {
        return $this->belongsTo(Ville::class, 'id_ville');
    }

public function messages()
{
return $this->hasMany(Message::class);
}

public function visits()
{
return $this->hasMany(Visit::class);
}

public function favori()
{
return $this->hasMany(Favoris::class);
}

public function annonces()
{
return $this->hasMany(Annonce::class);
}
}
