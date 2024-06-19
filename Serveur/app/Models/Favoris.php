<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favoris extends Model
{
    use HasFactory;
    public function annonces()
    {
    return $this->belongsTo(Annonce::class,"id_annonce");
    }
    public function clients()
    {
    return $this->belongsTo(Client::class,"id_client");
    }
}
