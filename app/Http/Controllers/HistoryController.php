<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Client;
use Illuminate\Http\Request;
use App\Models\History;
use App\Models\HistoryImages;
use App\Models\Prestataire;
use App\Models\Services;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class HistoryController extends Controller
{
    public function createHistory(Request $request)
    {
        $validatedData = $request->validate([
            'client_id' => 'integer',
            'prestataire_id' => 'required|integer',
            'typeService' => 'required|string|max:255',
            'Service' => 'required|integer',
            'niveauDurgence' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'images' => 'required|array',
            'images.*' => 'required|string', // Validate that each image is a Base64 string
        ]);

        try {
            $serviceName = Services::where('id',$validatedData['Service'])->value('serviceName');

            // Create History record
            $history = History::create([
                'client_id' => $validatedData['client_id'],
                'prestataire_id' => $validatedData['prestataire_id'],
                'type_service' => $validatedData['typeService'],
                'service_name' => $serviceName,
                'date_sent' => now(),
                'niveauDurgence' => $validatedData['niveauDurgence'],
                'description' => $validatedData['description'],
                'date' => $validatedData['date'],
                'time' => $validatedData['time'],
            ]);

            // Create Conversation between each other
            $existingMessage = Message::where('client_id', $validatedData['client_id'])
                ->where('prestataire_id', $validatedData['prestataire_id'])
                ->where('message', "Hi Service Provider!")
                ->first();

            if (!$existingMessage) {
                $message = Message::create([
                    'client_id' => $validatedData['client_id'],
                    'prestataire_id' => $validatedData['prestataire_id'],
                    'sender' => "client",
                    'message' => "Hi Service Provider!",
                    'audio' => null,
                    'file' => null,
                ]);
            }

          // Decode and save images
          foreach ($validatedData['images'] as $base64Image) {
            if (!preg_match('/^data:image\/(\w+);base64,/', $base64Image, $type)) {
                throw new \Exception('Invalid image format in Base64 string.');
            }

            $typeImg = $type[1]; // jpeg, png, etc.
            $imageData = base64_decode(preg_replace('/^data:image\/\w+;base64,/', '', $base64Image));

            if ($imageData === false) {
                throw new \Exception('Failed to decode Base64 image.');
            }

            $fileName = time() . '-' . uniqid() . '.' . $typeImg;
            $filePath = 'images/' . $fileName;

            Storage::disk('public')->put($filePath, $imageData);

            HistoryImages::create([
                'history_id' => $history->id,
                'image' => $filePath,
            ]);
        }


                    // Find the prestataire by ID
                    $prestataireDecreese = Prestataire::find($validatedData['prestataire_id']);

                    // Check if the prestataire exists
                    if (!$prestataireDecreese) {
                        return response()->json(['message' => 'Prestataire not found'], 404);
                    }

                    // Ensure nbrOffres is not less than 1
                    if ($prestataireDecreese->NbrOffres > 0) {
                        $prestataireDecreese->NbrOffres -= 1;
                        $prestataireDecreese->save();

        $prestataire = Prestataire::select('email', 'nom', 'prenom', 'telephone')
        ->find($validatedData['prestataire_id']);

    $client = Client::select('email', 'nom', 'prenom', 'telephone')
        ->find($validatedData['client_id']);

    if (!$prestataire || !$prestataire->email) {
        return response()->json(['error' => 'Prestataire not found or missing email.'], 404);
    }

    if (!$client) {
        return response()->json(['error' => 'Client not found.'], 404);
    }

    // Prepare email data
    $mailData = [
        'prestataireName' => $prestataire->nom,
        'clientName' => $client->nom,
        'telefoneClient' => $client->telephone,
        'telefonePres' => $prestataire->telephone,
        'clientPrenom' => $client->prenom,
        'prestatairePrenom' => $prestataire->prenom,
    ];

    try {
        // Send emails
        Mail::send('newDemande', ['mailData' => $mailData], function ($message) use ($prestataire) {
            $message->to($prestataire->email)
                ->subject('Nouvelle Demande de Service');
        });

        Mail::send('messageSent', ['mailData' => $mailData], function ($message) use ($client) {
            $message->to($client->email)
                ->subject('Votre demande de service a été envoyée');
        });

        Mail::send('TransactionMessage', ['mailData' => $mailData], function ($message) use ($client) {
            $message->to('achtik5819@gmail.com')
                ->subject('Nouvelle transaction a envoyer ');
        });
    } catch (\Exception $e) {
        return response()->json(['error' => 'Erreur lors de l\'envoi de l\'email : ' . $e->getMessage()], 500);
    }


            return response()->json([
                'message' => 'History record and images added successfully.',
                'data' => $history->load('images'), // Load associated images
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to add history record.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }



    public function getHistoryData($id){
        $history = History::find($id);
        $ClientId = History::find($id)->value('client_id');
        $ClientName = Client::find($ClientId)->value('nom');
        $ClientPrenom = Client::find($ClientId)->value('prenom');
        $PrestataireId = History::find($id)->value('prestataire_id');
        $PrestataireName = Prestataire::find($PrestataireId)->value('nom');
        $PrestatairePrenom = Prestataire::find($PrestataireId)->value('prenom');
        $images = HistoryImages::where('history_id', $id)->pluck('image');

        $history = History::find($id);
        return response()->json([
            'history' => $history ,
            'clientName' => $ClientName ,
            'PrestataireName' => $PrestataireName ,
            'ClientPrenom'=>$ClientPrenom ,
            'PrestatairePrenom'=>$PrestatairePrenom,
            'images' => $images,
            ]);
    }
}
