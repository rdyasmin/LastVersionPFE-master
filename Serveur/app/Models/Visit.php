<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    use HasFactory;
    public function annonces()
{
    return $this->belongsTo(Annonce::class, 'id_annonce')->select(['id','titre']);
}

public function clients()
{
    return $this->belongsTo(Client::class, 'id_client')->select(['id','telephone','nom']);
}

}
