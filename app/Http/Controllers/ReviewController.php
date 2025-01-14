<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        // Validate the incoming data
        $validatedData = $request->validate([
            'stars' => 'required|integer|min:1|max:5',
            'commentaire' => 'required|string|max:500',
            'prestataire_id' => 'required|integer|exists:prestataires,id',
        ]);

        // Store the review in the database
        $review = Review::create([
            'NbrStars' => $validatedData['stars'],
            'commentaire' => $validatedData['commentaire'],
            'prestataire_id' => $validatedData['prestataire_id'],
        ]);

        // Return a success response
        return response()->json([
            'message' => 'Votre avis a été enregistré avec succès !',
            'review' => $review,
        ], 201);
    }
}
