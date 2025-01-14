<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Client;
use Illuminate\Http\Request;
use App\Models\Prestataire;
use App\Models\Services;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class MessageController extends Controller
{
    /**
     * Fetch conversations based on user role.
     */
    public function getConversations($role, $id)
    {
        \Log::info("Role: $role, ID: $id");

        if ($role === 'prestataire') {
            $clients = Client::whereIn('id', Message::where('prestataire_id', $id)->pluck('client_id'))
                ->get()
                ->map(function ($client) use ($id) {
                    $messages = Message::where('client_id', $client->id)
                        ->where('prestataire_id', $id)
                        ->orderBy('created_at', 'desc')
                        ->get()
                        ->map(function ($message) {
                            return [
                                'presId' => $message->prestataire_id,
                                'clientid' => $message->client_id,
                                'created_at' => $message->created_at,
                                'message' => $message->message,
                                'audio' => $message->audio,
                                'file' => $message->file,
                                'sender' => $message->sender, // Retrieve sender
                            ];
                        });

                    return [
                        'nom' => $client->nom,
                        'prenom' => $client->prenom,
                        'messages' => $messages,
                    ];
                });

            return response()->json($clients);
        } elseif ($role === 'client') {
            $prestataires = Prestataire::whereIn('id', Message::where('client_id', $id)->pluck('prestataire_id'))
                ->get()
                ->map(function ($prestataire) use ($id) {
                    $messages = Message::where('prestataire_id', $prestataire->id)
                        ->where('client_id', $id)
                        ->orderBy('created_at', 'desc')
                        ->get()
                        ->map(function ($message) {
                            return [
                                'presId' => $message->prestataire_id,
                                'clientid' => $message->client_id,
                                'created_at' => $message->created_at,
                                'message' => $message->message,
                                'audio' => $message->audio,
                                'file' => $message->file,
                                'sender' => $message->sender, // Retrieve sender
                            ];
                        });

                    return [
                        'nom' => $prestataire->nom,
                        'prenom' => $prestataire->prenom,
                        'messages' => $messages,
                    ];
                });

            return response()->json($prestataires);
        }

        return response()->json([], 404);
    }

    public function sendMessage(Request $request)
    {
        try {
            // Validate the request
            $validated = $request->validate([
                'client_id' => 'required|exists:clients,id',
                'prestataire_id' => 'required|exists:prestataires,id',
                'sender' => 'required|in:client,prestataire',
                'message' => 'nullable|string',
                'nullable|file|mimes:mp3,wav,audio/mpeg,audio/x-wav',
                'file' => 'nullable|file|max:10240|mimes:jpg,jpeg,png,gif,pdf,doc,docx,ppt,pptx',

            ]);

            // Ensure at least one of message, audio, or file is provided
            if (empty($validated['message']) && !$request->hasFile('audio') && !$request->hasFile('file')) {
                return response()->json(['error' => 'You must provide at least one of message, audio, or file'], 422);
            }

            // Start a transaction
            DB::beginTransaction();

            // Create a temporary message record to get the ID
            $message = Message::create([
                'client_id' => $validated['client_id'],
                'prestataire_id' => $validated['prestataire_id'],
                'sender' => $validated['sender'],
                'message' => $validated['message'] ?? null,
                'audio' => null,
                'file' => null,
            ]);

            // Save files with the desired directory structure
            $audioPath = null;
            $filePath = null;

            if ($request->hasFile('audio')) {
                // Generate a random name for the audio file
                $randomName = uniqid() . '.' . $request->file('audio')->getClientOriginalExtension();

                // Define the path to the public 'files' folder
                $audioPath = public_path("files/");

                // Ensure the directory exists
                if (!file_exists($audioPath)) {
                    mkdir($audioPath, 0777, true);
                }

                // Move the file to the 'files' folder with the random name
                $request->file('audio')->move($audioPath, $randomName);

                // Optionally, store the file path in the database
                $audioUrl = "files/{$randomName}";
            }


            if ($request->hasFile('file')) {
                // Get the original file name
                $originalName = $request->file('file')->getClientOriginalName();

                // Generate a random name for the file
                $randomName = uniqid() . '.' . $request->file('file')->getClientOriginalExtension();

                // Define the path to the public 'files' folder
                $filePath = public_path("files/");

                // Ensure the directory exists
                if (!file_exists($filePath)) {
                    mkdir($filePath, 0777, true); // Create the directory if it doesn't exist
                }

                // Move the file to the 'files' folder with the random name
                $request->file('file')->move($filePath, $randomName);

                // Optionally, store the file path in the database or return it
                $fileUrl = "files/{$randomName}"; // Path relative to the public directory

                // Example: Save to the database (if needed)
                // $message = new Message(); // Or use existing model
                // $message->file_path = $fileUrl;
                // $message->save();

                // Return a response with the file URL
                // return response()->json(['success' => true, 'file_url' => $fileUrl]);
            }



            // Update the message record with file paths
            $message->update([
                'audio' => $audioUrl ?? null,
                'file' => $fileUrl ?? null,
            ]);

            // Commit the transaction
            DB::commit();

            return response()->json(['success' => true, 'message' => $message], 201);

        } catch (\Throwable $e) {
            // Rollback the transaction in case of error
            DB::rollBack();

            // Log the error for debugging purposes
            \Log::error('Error sending message:', ['error' => $e->getMessage()]);

            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}
