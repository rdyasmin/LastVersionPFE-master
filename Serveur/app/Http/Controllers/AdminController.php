<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Annonce;
use App\Models\Client;

class AdminController extends Controller
{
    public function statique()
{
    $clients = Client::count();
    $annonces = Annonce::count();
    $statusdisponible = Annonce::where("statut", "vrais")->count();
    $statusnodisponible = Annonce::where("statut", "Disponible")->count();
    $prixTotal = Annonce::sum('prix');
    $data = [
        "clients" => $clients,
        "annonces" => $annonces,
        "statusdisponible" => $statusdisponible,
        "statusnodisponible" => $statusnodisponible,
        "prix"=>$prixTotal
    ];
    return response()->json($data);
}
public function annonces(){
    $annonce=Annonce::all();
    return response()->json($annonce);
}
public function clients(){
    $client=Client::with('ville')->get();
    return response()->json($client);
}
public function DestroyClient(Request $request){
    $id=$request->id;
    $annonce=Annonce::where("id_client",$id)->get();
    foreach($annonce as $annonce){
        $annonce->delete();
    }
    $client=Client::find($id);
    $client->delete();
    return response()->json($annonce);
}
public function ChangerRole(Request $request){
    $id=$request->id;
    $client=Client::find($id);
    $client->role=$request->role;
    $client->save();
    return response()->json($client);
}
public function ChangerPassword(Request $request){
    $id=$request->id;
    $client=Client::find($id);
    $client->motpasse=Hash::make($request->motpasse);
    $client->save();
    return response()->json($client);
}
public function treeannonce(){
    $annonces = Annonce::latest()->take(3)->get();
    return $annonces;
}
}
