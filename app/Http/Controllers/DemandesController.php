<?php

namespace App\Http\Controllers;

use App\Models\Demandes;
use App\Models\Prestataire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class DemandesController extends Controller
{
    public function store(Request $request)
{

    // \Log::info('Incoming Request Data:', $request->all());

    try {

        $validatedData = $request->validate([
            'client_id'=> 'required|exists:client,id',
            'prestataire_id' => 'required|exists:prestataires,id',
            'typeService' => 'required|string|max:255',
            'niveauDurgence' => 'required|string|max:50',
            'description' => 'required|string',
            'date' => 'nullable|date',
            'time' => 'nullable|date_format:H:i',
        ]);


        // \Log::info('Validated Data:', $validatedData);

        $demande = new Demandes();


        $demande->prestataire_id = $validatedData['prestataire_id'] ?? null;
        $demande->typeService = $validatedData['typeService'] ?? null;
        $demande->niveauDurgence = $validatedData['niveauDurgence'] ?? null;
        $demande->description = $validatedData['description'] ?? null;
        $demande->date = $validatedData['date'] ?? null;
        $demande->time = $validatedData['time'] ?? null;

        try
        {
            $user=Prestataire::Where("id",$validatedData["prestataire_id"])->value('email');
            if (count($user)>0)
           {
            //  $data["Url"]="http://localhost:8000/api/verfy_email/".$request->email."/".$token;
             $data["email"]=$request->email;
             $data["title"]="nouvelle demande de koulchiNet";
             $data["body"]="Please Click On Below Link To Reset Your Password";
             Mail::send("verficationemail",["data"=>$data],function($message) use ($data){
                   $message->to($data["email"])->subject($data["title"]);
             });


             return response()->json([
                'message' => 'Please check your mail to reset  your password',
                'token' => $tokenjwt,
            ], 201);

         }
         else
         {
           return response()->json(["success"=>false,'message'=>"User Not Found !"],400);
         }
        }
        catch (\Exception $e) {
         return response()->json(["success"=>false,"message"=>$e->getMessage()],400);
        }




        if ($demande->save()) {
            return response()->json([
                'message' => 'Demande créée avec succès',
                'demande' => $demande
            ], 201);
        } else {
            return response()->json([
                'message' => 'Échec de la création de la demande'
            ], 500);
        }
    } catch (\Illuminate\Validation\ValidationException $e) {

        // \Log::error('Validation Errors:', $e->errors());

        return response()->json([
            'message' => 'Erreur de validation',
            'errors' => $e->errors()
        ], 422);
    } catch (\Exception $e) {

        // \Log::error('Error saving demande:', [
        //     'message' => $e->getMessage(),
        //     'trace' => $e->getTraceAsString()
        // ]);

        return response()->json([
            'message' => 'Erreur lors de la sauvegarde',
            'error' => $e->getMessage()
        ], 500);
    }
}
}
