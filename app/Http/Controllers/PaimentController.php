<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Paiment;
use App\Models\Prestataire;
use App\Models\Services;
use App\Models\Upgraded;
use Illuminate\Http\Request;

class PaimentController extends Controller
{
    public function storePaiment(Request $request)
    {
        try {
            // Validate the incoming request
            $validatedData = $request->validate([
                'idPres' => 'required|exists:prestataires,id',
                'nbOffres' => 'required|integer',
                'NomOffre' => 'required|string',
                'prix' => 'required|integer',
                'file' => 'required|mimes:jpeg,png,jpg,gif,pdf|max:2048',
            ]);

            // Handle the file upload
            $imageName = null;
            if ($request->hasFile('file')) {
                $image = $request->file('file');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path("recipts"), $imageName);
            }

            // Store the data in the database
            Paiment::create([
                'prestataire_id' => $validatedData['idPres'],
                'NbrOffres' => $validatedData['nbOffres'],
                'NomOffre' => $validatedData['NomOffre'],
                'prix' => $validatedData['prix'],
                'recipteImage' => $imageName ? 'recipts/' . $imageName : null,
            ]);

            // Return a success response
            return response()->json([
                'message' => 'Votre demande a été créée avec succès. Veuillez attendre la validation de l\'administrateur!',
            ], 201);
        } catch (\Exception $e) {
            // Log the error (optional but recommended for debugging)
            // \Log::error('Erreur lors de la création du paiement : ' . $e->getMessage());

            // Return an error response
            return response()->json([
                'error' => 'Une erreur s\'est produite lors du traitement de votre demande. Veuillez réessayer.',
            ], 500);
        }
    }


    public function getAllDemandes(Request $request)
    {
        // Define the number of items per page (you can also get it from the request if needed)
        $perPage = $request->input('per_page', 10);

        // Paginate the demandes with eager loading of the related 'prestataire' data
        $demandes = Paiment::with('prestataire')->paginate($perPage);

        return response()->json([
            'data' => $demandes->items(),
            'currentPage' => $demandes->currentPage(),
            'totalPages' => $demandes->lastPage(),
            'totalItems' => $demandes->total(),
            'perPage' => $demandes->perPage()
        ]);
    }


    public function getDemande($id)
    {
        // Eager load the related 'prestataire' information
        $demandes = Paiment::with('prestataire')->where('id',$id)->get();
        $presDocs = Document::where('id_prestataire',$demandes[0]->prestataire->id)->get();
        $presService = Services::where('id',$demandes[0]->prestataire->service_id)->value('serviceName');
        return response()->json(['demande' =>$demandes , 'prestataireDoc' => $presDocs,'service'=>$presService]);
    }

    public function ApproverPrestataire(Request $request)
    {
        // Trouver le prestataire par son ID
        $prestataire = Prestataire::find($request->idPres);

        if ($prestataire) {
            // Récupérer les paiements associés au prestataire
            $paiements = Paiment::where('prestataire_id', $prestataire->id)->get();

            // Ajouter NbrOffres
            $prestataire->NbrOffres += $request->NbrOffres;
            $prestataire->save();

            // Déplacer les données vers une autre table (par ex., Historique)
            foreach ($paiements as $paiement) {
                Upgraded::create([
                    'prestataire_id' => $paiement->prestataire_id,
                    'NbrOffres' => $paiement->NbrOffres,
                    'NomOffre' => $paiement->NomOffre,
                    'recipteImage' => $paiement->recipteImage,
                    'prix' => $paiement->prix,
                ]);

                // Supprimer l'enregistrement original (si requis)
                $paiement->delete();
            }

            return response()->json(['message' => 'Nombre de services modifié avec succès, et données déplacées.']);
        }

        return response()->json(['error' => 'Prestataire non trouvé'], 404);
    }


    public function deletePaiment($id)
    {
        $service = Paiment::find($id);

        if ($service) {
            $service->delete();

            return response()->json(['message' => 'demande paiment supprimer avec success   ']);
        }

        return response()->json(['error' => 'Prestataire not found'], 404);
    }



}
