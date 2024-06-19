<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ville extends Model
{
    use HasFactory;
    public function secteurs()
    {
        return $this->hasMany(Secteur::class);
    }
    public function clients()
    {
        return $this->hasMany(Client::class);
    }
}
