<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Annonce;
use App\Models\Image;

class AnnonceController extends Controller
{
    public function index()
{
    $annonces = Annonce::with('secteur:id,nom', 'client', 'categorie:id,nom')->get();
    $ids = $annonces->pluck('id');
    $images = Image::whereIn('id_annonce', $ids)->get();

    $imagesGrouped = $images->groupBy('id_annonce');
    $annonces->each(function ($annonce) use ($imagesGrouped) {
        $annonce->images = $imagesGrouped[$annonce->id] ?? [];
    });
    return response()->json($annonces);
}
    public function store(Request $request){
        $annonce=new Annonce();
        $annonce->titre=$request->titre;
        $annonce->description=$request->description;
        $annonce->prix=$request->prix;
        $annonce->surface=$request->surface;
        $annonce->etage=$request->etage;
        $annonce->adresse=$request->adresse;
        $annonce->statut=$request->statut;
        $annonce->typeAnnonce=$request->typeAnnonce;
        $annonce->nombre_chambres=null;
        $annonce->id_categorie=$request->id_categorie;
        $annonce->id_client=$request->id_client;
        $annonce->id_secteur=$request->id_secteur;
        $annonce->save();
        return response()->json($annonce);
    }
    public function destroy($id){
        $annonce=Annonce::find($id);
        $annonce->delete();
        return response()->json($annonce);
    }
    public function update(Request $request){
        $annonce = Annonce::find($request->id);
        $annonce->titre=$request->titre;
        $annonce->description=$request->description;
        $annonce->prix=$request->prix;
        $annonce->surface=$request->surface;
        $annonce->etage=$request->etage || null;
        $annonce->adresse=$request->adresse;
        $annonce->statut=$request->statut;
        $annonce->typeAnnonce=$request->typeAnnonce;
        $annonce->nombre_chambres=$request->nombre_chambres || null;
        $annonce->id_categorie=$request->id_categorie;
        $annonce->id_client=$request->id_client;
        $annonce->id_secteur=$request->id_secteur;
        $annonce->save();
    }
    public function changestatus($id){
        $annonce=Annonce::find($id);
        $annonce->statut="vente";
        $annonce->save();
        return response()->json($annonce);
    }
    public function filterAnnonce(Request $request)
{
    $id_categorie = $request->input('id_categorie');
    $id_secteur = $request->input('id_secteur');
    $statut = $request->input('statut');

    $query = Annonce::query();

    if ($id_categorie !== null) {
        $query->where('id_categorie', $id_categorie);
    }

    if ($id_secteur !== null) {
        $query->where('id_secteur', $id_secteur);
    }

    if ($statut !== null) {
        $query->where('statut', $statut);
    }

    $annonces = $query->with('secteur:id,nom', 'client', 'categorie:id,nom')->get();

    $ids = $annonces->pluck('id');
    $images = Image::whereIn('id_annonce', $ids)->get();

    $imagesGrouped = $images->groupBy('id_annonce');
    
    $annonces->each(function ($annonce) use ($imagesGrouped) {
        $annonce->images = $imagesGrouped[$annonce->id] ?? [];
    });

    return $annonces;
}

}
