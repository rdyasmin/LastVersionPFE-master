<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Client;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email',
            'motpasse' => 'required'
        ]);

        $client = Client::where('email', $fields['email'])->first();
        if (!$client || !Hash::check($fields['motpasse'], $client->motpasse)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $token = $client->createToken($client->nom)->plainTextToken;
        $client->remember_token=$token;

        return response()->json($client);
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
        } catch (\Exception $e) {
            return response(['message' => 'Something went wrong'], 500);
        }

        return response()->json(['message' => 'Logged out']);
    }
}
