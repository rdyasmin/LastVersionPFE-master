<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Image;

class ImageController extends Controller
{
    public function index(){
        $images=Image::all();
        return  response()->json($images);
    }
    public function show(Request $request){
        $id=$request->id_annonce;
        $image=Image::where("id_annonce",$id)->get();
        return  response()->json($image);
    }


    public function store(Request $request){
        // Validate the request if necessary
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', 
            'id_annonce' => 'required|integer', 
        ]);
        $uploadedImage = $request->file('image');
        $imageName = time().'.'.$uploadedImage->getClientOriginalExtension();
        $imagePath = $uploadedImage->storeAs('images', $imageName);
        $image = new Image();
        $image->src = $imagePath; 
        $image->id_annonce = $request->id_annonce;
        $image->save();
    
        return response()->json($image);
    }
    

    public function destroy(Request $request){
        $image=Image::find($request->id);
        $image->delete();
        return response()->json($image);
    }
}
