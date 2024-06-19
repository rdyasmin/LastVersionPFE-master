<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ville;

class VilleController extends Controller
{
    public function index(){
        $villes=Ville::all();
        return  response()->json($villes);
    }
    public function store(Request $request){
        $ville=new Ville();
        $ville->nom=$request->nom;
        $ville->save();
        return response()->json($ville);
    }
    public function destroy(Request $request){
        $ville=Ville::find($request->id);
        $ville->delete();
        return response()->json($ville);
    }
}
