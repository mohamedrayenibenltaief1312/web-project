<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Note;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Création de l'utilisateur de test (Rayen)
        $user = User::create([
            'name' => 'Rayen',
            'email' => 'rayen@example.com',
            'password' => Hash::make('password123'),
        ]);

        // 2. Création de quelques notes d'exemple
        Note::create([
            'user_id' => $user->id,
            'title' => 'Réviser le cours de Laravel',
            'content' => 'Relire le chapitre sur les Contrôleurs et les Migrations.',
            'priority' => 'High',
        ]);

        Note::create([
            'user_id' => $user->id,
            'title' => 'Acheter du pain',
            'content' => 'Ne pas oublier la baguette !',
            'priority' => 'Low',
        ]);

        Note::create([
            'user_id' => $user->id,
            'title' => 'Projet NoteSwift',
            'content' => 'Finir l\'intégration entre React et l\'API Laravel.',
            'priority' => 'Medium',
        ]);

        Note::create([
            'user_id' => $user->id,
            'title' => 'Sport',
            'content' => 'Séance de 1h à la salle de gym.',
            'priority' => 'Medium',
        ]);
    }
}
