<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Disponibility;
use App\Models\Prestataire;
use Firebase\JWT\ExpiredException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\Services;
use App\Models\HistoryPrestataire;
use App\Models\Document;
use App\Models\History;
use App\Models\Review;
use App\Models\Ville;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Carbon;
use Tymon\JWTAuth\Facades\JWTAuth;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class PrestataireController extends Controller
{
    private $jwtSecret = 'your_secret_key';
    public function __construct()
    {
        $this->jwtSecret = env('JWT_SECRET'); // default-secret is a fallback value
    }

    public function getAllPrestataire(Request $request)
    {
        // Number of records per page (default to 10 if not provided)
        $perPage = $request->input('per_page', 10);

        // Fetch prestataires with pagination
        $prestataires = Prestataire::paginate($perPage);

        if ($prestataires->count() > 0) {
            return response()->json([
                "prestataire" => $prestataires->items(), // Current page records
                "currentPage" => $prestataires->currentPage(),
                "totalPages" => $prestataires->lastPage(),
                "totalItems" => $prestataires->total(),
                "perPage" => $prestataires->perPage()
            ], 200);
        }

        return response()->json(["message" => "No prestataires found"], 404);
    }

    public function getPrestataireById($id)
    {
        $prestataire = Prestataire::with('documents','service','Disponibility')
        ->where('id', $id)
        ->first();

        if ($prestataire) {
            return response()->json(["prestataire"=>$prestataire],201);
        }
         return response()->json(["prestataire"=>"not found"],401);
    }


    public function index()
    {
        $users = Prestataire::all();

        return response()->json($users);
    }

    public function activePrestataire($id){

        $prs = Prestataire::find($id);

        // Check if the Prestataire exists
        if ($prs) {
            // Mark the Prestataire as approved
            $prs->is_approved = 1;
            $prs->save();

            // Return success message
            return response()->json(["message" => "Prestataire approuvé avec succès"], 200);
        } else {
            // Return an error if the Prestataire is not found
            return response()->json(["message" => "Prestataire non trouvé"], 404);
        }
    }

    public function deletePrestataire($id)
    {

            // Find the client by ID
            $prestataire = Prestataire::find($id);
            if ($prestataire) {
                $prestataire->delete();
                return response()->json(['message' => 'Prestataire supprimé avec succès'], 200);
            }


            return response()->json(['error' => 'Prestataire non trouvé'], 404);

    }

    public function Register(Request $request)
    {

        $validatedData = $request->validate([
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'telephone' => 'required|string',
            'mot_de_passe' => 'required|string|min:8|confirmed',
            'ville' => 'required|string|max:255',
            'quartier' => 'required|string|max:255',
            'name_service' => 'required|integer',
            'description_service' => 'nullable|string',
            'annees_experience' => 'required|integer',
            'statut' => 'required|string',
            'diplome' => 'required|file|mimes:pdf,doc,docx',
            'profile_photo' => 'required|image|mimes:jpg,jpeg,png,gif',
            'disponibility' => 'required|json',

        ]);


        $existingPrestataire = Prestataire::where('email', $validatedData['email'])->first();
        if ($existingPrestataire) {
            return response()->json([
                'status' => 'error',
                'message' => 'L\'adresse email existe deja.',
            ], 400);
        }
        $token=Str::random(100);


        $Prestataire = Prestataire::create([
            'prenom' => $validatedData['prenom'],
            'nom' => $validatedData['nom'],
            'email' => $validatedData['email'],
            'telephone' => $validatedData['telephone'],
            'password' => Hash::make($validatedData['mot_de_passe']),
            'ville' => $validatedData['ville'],
            'service_id' => $validatedData['name_service'],
            "description_service"=>$validatedData["description_service"],
            "annees_experience"=>$validatedData["annees_experience"],
            "statut"=>$validatedData["statut"],
            // "disponibilite"=>$validatedData["disponibility"],
            'aroundissment' => $validatedData['quartier'],
            'email_verification_token'=>$token,
        ]);


        $pres = Prestataire::where("email", $validatedData["email"])->first();

        $disponibility = json_decode($validatedData['disponibility'], true);

        foreach ($disponibility as $disp) {
            foreach ($disp['times'] as $time) {
                // Convert the times to proper time format (H:i:s)
                $startTime = date('H:i:s', strtotime($time['start']));
                $endTime = date('H:i:s', strtotime($time['end']));

                // Save each time slot in the database
                Disponibility::create([
                    'prestataire_id' => $pres->id,  // Link to the user (prestataire)
                    'jour' => $disp['jour'],        // Day of the week (e.g., 'monday')
                    'debut' => $startTime,          // Start time (e.g., '08:00:00')
                    'fin' => $endTime,              // End time (e.g., '12:00:00')
                ]);
            }
        }





        if ($request->hasFile('diplome')) {
            $Diplome = $request->file("diplome");

            $DiplomeName = time() . '_' . $Diplome->getClientOriginalName();

            $Diplome->move(public_path("Diplomes"), $DiplomeName);
        }

        if ($request->hasFile('profile_photo')) {
            $profilePhoto = $request->file("profile_photo");

            $profilePhotoName = time() . '_' . $profilePhoto->getClientOriginalName();

            $profilePhoto->move(public_path("profile_photos_perstataire"), $profilePhotoName);
        }



        Document::create([
            'id_prestataire'=>$pres['id'],
            'diplome_sertificat' => $DiplomeName,
            'photo' => $profilePhotoName,
        ]);
        $expiration = Carbon::now()->addMonths(12);
        $tokenjwt =JWTAuth::fromUser($Prestataire,['exp'=>$expiration->timestamp]);
        try
        {
            $user=Prestataire::Where("email",$validatedData["email"])->get();
            if (count($user)>0)
           {
             $data["Url"]="http://localhost:8000/api/verfy_email/".$request->email."/".$token;
             $data["email"]=$request->email;
             $data["title"]="Confirmation de votre email";
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
    }


    public function verfyEmail($email,$token)
    {
        $pres=Prestataire::Where("email",$email)->first();
        if ($pres["email_verification_token"]==$token) {
            $pres['email_verified_at']=Carbon::now()->format('Y-m-d H:i:s');
            $pres->save();
            return view("remerciePrestataire");
        }
    }


    public function showHistoryWithClient($prestataireId)
    {
        // Find the histories for the prestataire by ID and load the related prestataire and client
        $histories = History::with(['prestataire', 'client'])
            ->where('prestataire_id', $prestataireId)
            ->paginate(10); // Add pagination here

        if ($histories->isEmpty()) { // Check if no histories are found
            return response()->json(['message' => 'No histories found for this prestataire'], 404);
        }

        // Return the response with pagination info and the histories data
        return response()->json([
            'data' => $histories->items(), // Get the current page data
            'meta' => [
                'current_page' => $histories->currentPage(),
                'last_page' => $histories->lastPage(),
                'total' => $histories->total(),
            ]
        ]);
    }





    public function checkIfPrestataireExists(Request $request)
{
    $this->jwtSecret = env('JWT_SECRET');
    $token = $request->bearerToken();

    try {

        // Decode the token
        $decoded = JWT::decode($token, new Key($this->jwtSecret, 'HS256'));

        if (!$decoded) {
            return response()->json(['message' => 'Decoded token is empty'], 400);
        }
        $prestataireId = $decoded->sub;
        $prestataire = Prestataire::find($prestataireId);
        $service = Services::find($prestataire->service_id);
        $prestataireDoc =  Document::where('id_prestataire' , $prestataireId)->get();
        $dispo =  Disponibility::where('prestataire_id' , $prestataireId)->get();

         if ($prestataire && $prestataire->email_verified_at) {
                if ($prestataire->is_approved) {
                    return response()->json(["approved" => true, "Prestataire" => $prestataire , "documents" => $prestataireDoc, 'service' => $service ,'dispo'=>$dispo], 201);
                }
                return response()->json(["approved" => false], 201);
        }
        return response()->json(['message' => 'Prestataire not found'], 404);


    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage(), 'error' => $e->getTrace()], 400);
    }
}
public function getPres($id)
{
    $prestataire = Prestataire::with( 'service', 'documents','Disponibility')->findOrFail($id);

    $reviews = Review::where('prestataire_id', $id)->get();
    $averageRating = $reviews->avg('NbrStars');

    return response()->json([
        'user' => $prestataire,
        'service' => $prestataire->service,
        'documents' => $prestataire->documents,
        'reviews' => $reviews,
        'averageRating' => $averageRating,
        'Disponibility' => $prestataire->Disponibility,
    ]);
}



    public function getPresFiltre(Request $request){
        $ville = $request->ville;
        $arroundisment = $request->arroundisment;
        $service_id = $request->service_id;

        $prestataires = Prestataire::where('ville', $ville)
        ->where('aroundissment', $arroundisment)
        ->where('service_id', $service_id)
        ->where('NbrOffres', '>', 0)
        ->with('service','documents')
        ->get();

            $service = $prestataires->map(function ($prestataire) {
                return [
                    'id' => $prestataire->id,
                    'nom' => $prestataire->nom,
                    'prenom' => $prestataire->prenom,
                    'description' => $prestataire->description_service,
                    'serviceName' => $prestataire->service->serviceName ?? null,
                    'documents' => $prestataire->documents ?? null,
                    'ville' => $prestataire->ville ?? null,
                ];
            });

        return response()->json( $service);
    }


    public function getPresFiltreByCity(Request $request){
        $ville = $request->ville;
        // $arroundisment = $request->arroundisment;
        $service_id = $request->service_id;

        $prestataires = Prestataire::where('ville', $ville)
        // ->where('aroundissment', $arroundisment)
        ->where('service_id', $service_id)
        ->where('NbrOffres', '>', 0)
        ->with('service','documents')
        ->get();

            $service = $prestataires->map(function ($prestataire) {
                return [
                    'id' => $prestataire->id,
                    'nom' => $prestataire->nom,
                    'prenom' => $prestataire->prenom,
                    'description' => $prestataire->description_service,
                    'serviceName' => $prestataire->service->serviceName ?? null,
                    'documents' => $prestataire->documents ?? null,
                    'ville' => $prestataire->ville ?? null,
                ];
            });

        return response()->json( $service);
    }
    public function getPresFiltreByRegion(Request $request){
        $ville = $request->ville;
        // $arroundisment = $request->arroundisment;
        $service_id = $request->service_id;
        //get the region of the city
        $GetRegion = Ville::where('villePricipale' , $ville)->value('region');
        //get citys of the region
        $citys = ville::where('region', $GetRegion)->pluck('villePricipale')->toArray();

        $prestataires = Prestataire::whereIn('ville', $citys)
        // ->where('aroundissment', $arroundisment)
        ->where('service_id', $service_id)
        ->where('NbrOffres', '>', 0)
        ->with('service','documents')
        ->get();

            $service = $prestataires->map(function ($prestataire) {
                return [
                    'id' => $prestataire->id,
                    'nom' => $prestataire->nom,
                    'prenom' => $prestataire->prenom,
                    'description' => $prestataire->description_service,
                    'serviceName' => $prestataire->service->serviceName ?? null,
                    'documents' => $prestataire->documents ?? null,
                    'ville' => $prestataire->ville ?? null,
                ];
            });

        return response()->json( $service);
    }

    public function getCurrentPrestataire(Request $request)
    {
        try {
            $prestataire = Prestataire::with(['service' => function($query) {
                $query->select('services.id', 'services.serviceName', 'services.PRO');
            }])->find($request->id);

            return response()->json([
                'prestataire' => $prestataire,
                'has_pro_services' => $prestataire->service && $prestataire->service->PRO
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching prestataire details',
                'error' => $e->getMessage()
            ], 500);
        }
    }






    public function update(Request $request, $id)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'prenom' => 'nullable|string|max:255',
            'nom' => 'nullable|string|max:255',
            'telephone' => 'nullable|string',
            'ville' => 'nullable|string|max:255',
            'quartier' => 'nullable|string|max:255',
            // 'service_id' => 'nullable|integer|exists:services,id',
            'description_service' => 'nullable|string',
            'annees_experience' => 'nullable|integer',
            'statut' => 'nullable|string',
           'disponibility' => 'nullable|json',
            'profile_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Added validation for photo
        ]);

        // Find the prestataire by ID
        $prestataire = Prestataire::find($id);

        if (!$prestataire) {
            return response()->json([
                'status' => 'error',
                'message' => 'Prestataire not found.',
            ], 404);
        }

        // Fetch the associated Document record
        $doc = Document::where('id_prestataire', $prestataire->id)->first();

        // Ensure $doc is not null before proceeding
        if (!$doc) {
            return response()->json([
                'status' => 'error',
                'message' => 'Document not found for the prestataire.',
            ], 404);
        }

        // Update profile photo in Document if provided
        if ($request->hasFile('profile_photo')) {
            // Check if the old photo exists and delete it from the Document
            if ($doc->photo && File::exists(public_path("profile_photos_perstataire/" . $doc->photo))) {
                File::delete(public_path("profile_photos_perstataire/" . $doc->photo));
            }

            // Upload new photo
            $profilePhoto = $request->file('profile_photo');
            $profilePhotoName = time() . '_' . $profilePhoto->getClientOriginalName();
            $profilePhoto->move(public_path("profile_photos_perstataire"), $profilePhotoName);

            // Update photo field in the Document
            $doc->photo = $profilePhotoName;
            $doc->save();
        }





        $disponibility = isset($validatedData['disponibility']) ? json_decode($validatedData['disponibility'], true) : null;

        if ($disponibility) {
            foreach ($disponibility as $disp) {
                // Delete existing records for the specified day (jour)
                Disponibility::where('prestataire_id', $prestataire->id)
                    ->where('jour', $disp['jour'])
                    ->delete();

                // Insert new time slots for the day
                foreach ($disp['times'] as $time) {
                    $startTime = date('H:i:s', strtotime($time['start']));
                    $endTime = date('H:i:s', strtotime($time['end']));

                    Disponibility::create([
                        'prestataire_id' => $prestataire->id,
                        'jour' => $disp['jour'],
                        'debut' => $startTime,
                        'fin' => $endTime,
                        // Add additional fields if needed
                    ]);
                }
            }
        }




        // Update other fields in Prestataire model
        $prestataire->prenom = $validatedData['prenom'] ?? $prestataire->prenom;
        $prestataire->nom = $validatedData['nom'] ?? $prestataire->nom;
        $prestataire->telephone = $validatedData['telephone'] ?? $prestataire->telephone;
        $prestataire->ville = $validatedData['ville'] ?? $prestataire->ville;
        $prestataire->aroundissment= $validatedData['quartier'] ?? $prestataire->aroundissment;
        // $prestataire->service_id = $validatedData['service'] ?? $prestataire->service;
        $prestataire->description_service = $validatedData['description_service'] ?? $prestataire->description_service;
        $prestataire->annees_experience = $validatedData['annees_experience'] ?? $prestataire->annees_experience;
        $prestataire->statut = $validatedData['statut'] ?? $prestataire->statut;
        // $prestataire->disponibilite = $validatedData['disponibilite'] ?? $prestataire->disponibilite;

        // Save updated Prestataire data
        $prestataire->save();

        // Create JWT token for the response
        $tokenPayload = [
            'email' => $prestataire->email,
            'id_prestataire' => $prestataire->id,
            'document_id' => $doc->id,
            'expiration' => Carbon::now()->addHours(24)->timestamp,
        ];
        $tokenjwt = JWT::encode($tokenPayload, $this->jwtSecret, 'HS256');

        try {
            return response()->json([
                'status' => 'success',
                'token' => $tokenjwt,
                'message' => 'Prestataire mis à jour avec succès.',
            ], 201);
        } catch (\Exception $e) {
            return response()->json(["success" => false, "message" => $e->getMessage()], 400);
        }
    }


    public function changePassword(Request $request, $id)
{

    $request->validate([
        'password_actuel' => 'required|string',
        'password_nouveau' => 'required|string|min:8',
    ]);
    $user = Prestataire::find($id);
    if (!$user) {
        return response()->json(['error' => 'Utilisateur non trouvé'], 404);
    }
    if (!Hash::check($request->password_actuel, $user->password)) {
        return response()->json(['error' => 'Le mot de passe actuel est incorrect'], 400);
    }
    if ($request->password_actuel === $request->password_nouveau) {
        return response()->json(['error' => 'Le nouveau mot de passe ne peut pas être identique au mot de passe actuel'], 400);
    }
    $user->password = Hash::make($request->password_nouveau);
    $user->save();

    return response()->json(['message' => 'Mot de passe mis à jour avec succès'], 200);
}


public function checkProStatus($id)
{
    try {
        $prestataire = Prestataire::find($id);

        if (!$prestataire) {
            return response()->json(['error' => 'Prestataire not found'], 404);
        }

        // Get the service and check its PRO status directly from the services table
        $service = Services::select('PRO')
            ->where('id', $prestataire->service_id)
            ->first();

        // If service exists and PRO is 1, return true, otherwise false
        $isPro = $service && $service->PRO == 1;

        return response()->json([
            'isPro' => $isPro
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Error checking PRO status',
            'message' => $e->getMessage()
        ], 500);
    }
}



public function getPrestataireByService($serviceName)
{
    // Find the service by name
    $service = Services::where('serviceName', $serviceName)->first();

    if (!$service) {
        return response()->json([
            'success' => false,
            'message' => 'Service not found.',
        ], 404);
    }

    // Fetch the prestataire associated with the service
    $prestataires = Prestataire::where('service_id',$service->id)->get();

    if (!$prestataires) {
        return response()->json([
            'success' => false,
            'message' => 'Prestataire not found.',
        ], 404);
    }
  // Fetch reviews for each prestataire
  $prestataireData = $prestataires->map(function ($prestataire) {
    $reviews = Review::where('prestataire_id', $prestataire->id)->get();
    return [
        'id' => $prestataire->id,
        'name' => $prestataire->nom,
        'LastName' => $prestataire->prenom,
        'reviews' => $reviews,
    ];
});

// Return the response
        return response()->json([
            'success' => true,
            'prestataires' => $prestataireData,
            'service' => $service->only(['id', 'serviceName']),
        ]);
}
}
