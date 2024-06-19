<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    public function index(){
        $messages=Message::with('clients')->get();
        return  response()->json($messages);
    }
    public function show(Request $request){
        $id=$request->id;
        $message=Message::where("id_client",$id)->get();
        return  response()->json($message);
    }

    public function store(Request $request){
        $messages=new Message();
        $messages->message=$request->message;
        $messages->id_client=$request->id_client;
        $messages->save();
        return response()->json($messages);
    }
}
