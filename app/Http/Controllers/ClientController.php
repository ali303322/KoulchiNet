<?php

namespace App\Http\Controllers;
use App\Models\Client;
use App\Models\History;
use App\Models\HistoryClient;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\File;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Hmac\Sha256;

class ClientController extends Controller
{
    private $jwtSecret = 'your_secret_key';
    public function __construct()
    {
        $this->jwtSecret = env('JWT_SECRET'); // default-secret is a fallback value
    }

    public function getAllClient(Request $request)
    {
        $clients = Client::paginate(10);

        return response()->json([
            'data' => $clients->items(),
            'last_page' => $clients->lastPage(),
        ], 200);
    }




    public function getClientById($id)
    {
        $Client = Client::find($id);

        if ($Client) {
            return response()->json(["client"=>$Client],201);
        }
         return response()->json(["client"=>"not found"],401);
    }

    public function deleteClient($id)
    {

            // Find the client by ID
            $Client = Client::find($id);

            if ($Client) {

                if ($Client->photo_profel && File::exists(public_path('profile_photos_Client/' . $Client->photo_profel))) {
                        File::delete(public_path('profile_photos_Client/' . $Client->photo_profel));
                    }
                    $Client->delete();

                $prestataire->delete();

                return response()->json(['message' => 'Client supprimé avec succès'], 200);
            } else {
                return response()->json(['message' => 'Client non trouvé'], 404);
            }
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
            'profile_photo' => 'required|image|mimes:jpg,jpeg,png,gif',
        ]);


        $existClient = Client::where('email', $validatedData['email'])->first();
        if ($existClient) {
            return response()->json([
                'status' => 'error',
                'message' => 'L\'adresse email existe deja.',
            ], 400);
        }
        $token=Str::random(100);

        $profilePhotoPath = null;

        if ($request->hasFile('profile_photo')) {
            $profilePhoto = $request->file("profile_photo");
            $profilePhotoName = time() . '_' . $profilePhoto->getClientOriginalName();
            $profilePhoto->move(public_path("profile_photos_Client"), $profilePhotoName);
        }


        $Client = Client::create([
            'prenom' => $validatedData['prenom'],
            'nom' => $validatedData['nom'],
            'email' => $validatedData['email'],
            'telephone' => $validatedData['telephone'],
            'password' => Hash::make($validatedData['mot_de_passe']),
            'ville' => $validatedData['ville'],
            'aroundissment' => $validatedData['quartier'],
            'photo_profel' => $profilePhotoName,
            'email_verification_token'=>$token,
        ]);
        $expiration = Carbon::now()->addHours(24);
        $tokenjwt =JWTAuth::fromUser($Client,['exp'=>$expiration->timestamp]);

        try
        {
            $clientEmail=Client::Where("email",$validatedData["email"])->get();
            if (count($clientEmail)>0)
           {
             $data["Url"]="http://localhost:8000/api/verfy_email_client/".$request->email."/".$token;
             $data["email"]=$request->email;
             $data["title"]="Confirmation de votre email";
             $data["body"]="Please Click On Below Link To Reset Your Password";
             Mail::send("verficationemail", ["data" => $data], function($message) use ($data) {
                // Utilisation de 'to()' pour spécifier l'email du destinataire
                $message->to($data["email"])
                        ->subject($data["title"]);
            });

             return response()->json([
                'message' => 'Please check your mail confirme it',
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
        $client=Client::Where("email",$email)->first();
        if ($client["email_verification_token"]==$token) {
            $client->email_verified_at = Carbon::now();
            $client->save();
            return view("remerciepourverfication",["route"=>"http://localhost:3000/ClientDashboard"]);
        }
    }



    public function checkIfClientExists(Request $request)
    {
        $this->jwtSecret = env('JWT_SECRET');
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['message' => 'Token not provided'], 400);
        }
        try {


            $decoded =JWT::decode($token, new Key($this->jwtSecret, 'HS256'));
            if (!$decoded) {
                return response()->json(['message' => 'Decoded token is empty'], 400);
            }
            $clientid = $decoded->sub;
            $client = Client::find($clientid);

            if ($client && $client->email_verified_at) {
                return response()->json(["client"=>$client]);

            }


            return response()->json(['message' => 'Client not found'], 404);


        }
        catch(\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }

    }

    public function showHistoryClient($clientId)
{
    // Find the histories for the prestataire by ID and load the related prestataire and client
    $histories = History::with(['prestataire', 'client'])
        ->where('client_id', $clientId)
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

    // public function showHistoryClient($clientId, Request $request)
    // {
    //     // Get the number of items per page from the request (default to 10 if not provided)
    //     $perPage = $request->input('per_page', 10);

    //     // Find the client and paginate the histories, eager loading the 'prestataire' relationship
    //     $client = Client::with(['histories.prestataire'])->find($clientId);

    //     if (!$client) {
    //         return response()->json(['message' => 'Client not found'], 404);
    //     }

    //     // Paginate the histories
    //     $histories = $client->histories()->paginate($perPage);

    //     return response()->json([
    //         'histories' => $histories->items(), // Current page records
    //         'currentPage' => $histories->currentPage(),
    //         'totalPages' => $histories->lastPage(),
    //         'totalItems' => $histories->total(),
    //         'perPage' => $histories->perPage()
    //     ]);
    // }




    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'telephone' => 'required|string',
            'ville' => 'required|string|max:255',
            'quartier' => 'required|string|max:255',
            // 'photo_profel' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $client = Client::find($id);

        if (!$client) {
            return response()->json([
                'status' => 'error',
                'message' => 'Client non trouvé.',
            ], 404);
        }




        if ($request->hasFile('photo_profel')) {
            $filePath = public_path('profile_photos_Client/' . $client->photo_profel);
            if ($client->photo_profel && File::exists($filePath)) {
                File::delete($filePath);
            }
            $photo = $request->file('photo_profel');
            $profilePhotoName = time() . '_' . $photo->getClientOriginalName();
            $photo->move(public_path('profile_photos_Client'), $profilePhotoName);

            // Update the client's profile photo name in the database
             // Save the changes to the client
        }else {
            $profilePhotoName=$client->photo_profel;
        }


        $client->update([
            'prenom' => $validatedData['prenom'],
            'nom' => $validatedData['nom'],
            'telephone' => $validatedData['telephone'],
            'ville' => $validatedData['ville'],
            'aroundissment' => $validatedData['quartier'],
            'photo_profel' => $profilePhotoName,
        ]);

        $expiration = Carbon::now()->addHours(24);
        $tokenjwt = JWTAuth::fromUser($client, ['exp' => $expiration->timestamp]);

        try {
            return response()->json([
                'status' => 'success',
                'message' => 'Données du client mises à jour avec succès.',
                'token' => $tokenjwt,
            ], 200);
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
        $user = Client::find($id);
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



}
