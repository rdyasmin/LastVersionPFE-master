<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Secteur;

class SecteurController extends Controller
{
    public function index(Request $request) {
        $id = $request->id;
        $secteurs = Secteur::where('id_ville', $id)->get();
        return response()->json($secteurs);
    }
    
}
