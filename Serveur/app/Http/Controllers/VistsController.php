<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Visit;

class VistsController extends Controller
{
  
    public function index(Request $request)
{
    $id = $request->id;
    
    $visits = Visit::with(['annonces' => function ($query) use ($id) {
                            $query->where('id_client', $id)->select('id', 'titre', 'id_client');
                        }, 'clients'])
                    ->whereHas('annonces', function ($query) use ($id) {
                        $query->where('id_client', $id);
                    })
                    ->get();

    return response()->json($visits);
}
public function destroy(Request $request){
    $visit=Visit::find($request->id);
    $visit->delete();
    return response()->json($visit);
}

public function store(Request $request){
    $visit = new Visit();
    $visit->date = now(); 
    $visit->id_annonce = $request->id_annonce;
    $visit->id_client = $request->id_client;
    $visit->message = $request->message;
    $visit->tel = $request->tel;
    $visit->save();  
    return response()->json($visit);
}
    
}
