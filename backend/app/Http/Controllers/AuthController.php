<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // 1. Inscription (Register)
    public function register(Request $request)
    {
        // Validation des données
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Création de l'utilisateur
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // On crypte le mot de passe !
        ]);

        // Création du Token (le bracelet VIP)
        $token = $user->createToken('auth_token')->plainTextToken;

        // On renvoie l'utilisateur et son token
        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    // 2. Connexion (Login)
    public function login(Request $request)
    {
        // Validation
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // On vérifie si l'email existe et si le mot de passe est correct
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Email ou mot de passe incorrect'], 401);
        }

        // Si c'est bon, on récupère l'utilisateur
        $user = User::where('email', $request->email)->firstOrFail();

        // On génère un nouveau token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    // 3. Déconnexion (Logout)
    public function logout(Request $request)
    {
        // On détruit le token actuel
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnecté avec succès']);
    }
}
