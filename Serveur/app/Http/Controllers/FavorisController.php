<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favoris;

class FavorisController extends Controller
{
    public function index(){
        $favoris=Favoris::with("annonces","clients")->get();
        return  response()->json($favoris);
    }
    public function store(Request $request){
        // Check if the favoris entry already exists
        $existingFavoris = Favoris::where('id_client', $request->id_client)
                                    ->where('id_annonce', $request->id_annonce)
                                    ->first();
    
        if ($existingFavoris) {
            // If favoris entry already exists, return a message or response indicating it's already favorited
            return response()->json(['message' => 'This annonce is already favorited.']);
        }
    
        // If favoris entry does not exist, create and save it
        $favoris = new Favoris();
        $favoris->id_client = $request->id_client;
        $favoris->id_annonce = $request->id_annonce;
        $favoris->save();
    
        return response()->json($favoris);
    }
    
    
    public function destroy(Request $request){
        $idclient = $request->id_client;
        $idannonce = $request->id_annonce;
        $favoris = Favoris::where(['id_client' => $idclient, 'id_annonce' => $idannonce])->first();
        
        if($favoris){
            $favoris->delete();
            return response()->json(['message' => 'Favoris deleted successfully']);
        } else {
            return response()->json(['message' => 'Favoris not found']);
        }
    }
    public function show(Request $request){
        $id_client=$request->id_client;
        $favoris=Favoris::with("annonces","clients")->where("id_client",$id_client)->get();
        return  response()->json($favoris);
    }
    
}
