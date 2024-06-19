<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::with('ville:id,nom')->get();

        return response()->json($clients);
    }



    public function store(Request $request){
        $client=new Client();
        $client->nom=$request->nom;
        $client->genre=$request->genre;
        $client->age=$request->age;
        $client->email=$request->email;
        $client->srcimg=null;
        $client->motpasse = Hash::make($request->motpasse);
        $client->telephone=$request->telephone;
        $client->role="Member";
        $client->id_ville=$request->id_ville;
        $client->save();
        return response()->json($client);
    }
   
    public function show(request $request){
        $client=Client::with('ville:id,nom')->find($request->id);
        return response()->json($client);
    }
    public function destroy(request $request){
        $client=Client::find($request->id);
        $client->delete();
        return response()->json($client);
    }
    
    public function update(Request $request)
{
    $client = Client::find($request->id);
    if (Hash::check($request->oldmotpasse, $client->motpasse)) {
        $client->motpasse = Hash::make($request->motpasse);
        $client->telephone = $request->telephone === null ?$client->telephone : $request->telephone;
        $client->save();

        return response()->json($client);
    } else {
        return response()->json(['message' => 'Incorrect old password']);
    }
}
}
