<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    /**
     * Liste des notes de l'utilisateur connecté
     */
    public function index(Request $request)
    {
        // On récupère uniquement les notes qui appartiennent à l'utilisateur actuel
        return $request->user()->notes()->latest()->get();
    }

    /**
     * Création d'une nouvelle note
     */
    public function store(Request $request)
    {
        // Validation des règles du PDF
        $request->validate([
            'title' => 'required|string|max:100',
            'content' => 'nullable|string',
            'priority' => 'required|string|in:Low,Medium,High',
        ]);

        // Création de la note liée à l'utilisateur
        $note = $request->user()->notes()->create([
            'title' => $request->title,
            'content' => $request->content,
            'priority' => $request->priority,
        ]);

        return response()->json($note, 201);
    }

    /**
     * Modification d'une note
     */
    public function update(Request $request, Note $note)
    {
        // Sécurité : on vérifie que la note appartient bien à l'utilisateur !
        if ($request->user()->id !== $note->user_id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:100',
            'content' => 'nullable|string',
            'priority' => 'required|string|in:Low,Medium,High',
        ]);

        $note->update($request->all());

        return response()->json($note);
    }

    /**
     * Suppression d'une note
     */
    public function destroy(Request $request, Note $note)
    {
        // Sécurité : on vérifie que la note appartient bien à l'utilisateur
        if ($request->user()->id !== $note->user_id) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $note->delete();

        return response()->json(['message' => 'Note supprimée']);
    }
}
