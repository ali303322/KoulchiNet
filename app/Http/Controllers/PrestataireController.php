<?php

namespace App\Http\Controllers;

use App\Models\Prestataire;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\Services;
use App\Models\Document;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Carbon;
class PrestataireController extends Controller
{
    public function index(Request $request)
    {
        // Get savedData from the headers
        $savedData = $request->header('filter');

        // Example: Filter users based on savedData
        $users = Prestataire::where('some_column', $savedData)->get();

        return response()->json([
            'message' => 'Filtered users',
            'data' => $users
        ]);
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
            'name_service' => 'required|string|max:100', 
            'description_service' => 'required|string',
            'annees_experience' => 'required|integer', 
            'statut' => 'required|string', 
            'disponibilite' => 'required|date', 
            'diplome' => 'required|file|mimes:pdf,doc,docx', 
            'profile_photo' => 'required|image|mimes:jpg,jpeg,png,gif',
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
            'aroundissment' => $validatedData['quartier'],
            'disponibilite'=>$validatedData['disponibilite'],
            'email_verification_token'=>$token,
        ]);

        $pres = Prestataire::where("email", $validatedData["email"])->first();
     
        Services::create([
            "id_prestataire"=>$pres["id"],
             "name_service"=>$validatedData["name_service"],
            "description_service"=>$validatedData["description_service"],
            "annees_experience"=>$validatedData["annees_experience"],
            "statut"=>$validatedData["statut"],
            "category_id"=>1
        ]);
         

      

        if ($request->hasFile('diplome')) {
            $Diplome = $request->file("diplome");
            // Generate a unique filename to prevent overwriting
            $DiplomeName = time() . '_' . $Diplome->getClientOriginalName();
            // Move the file to the public directory
            $Diplome->move(public_path("Diplomes"), $DiplomeName);
        }
 
        if ($request->hasFile('profile_photo')) {
            $profilePhoto = $request->file("profile_photo");
            // Generate a unique filename to prevent overwriting
            $profilePhotoName = time() . '_' . $profilePhoto->getClientOriginalName();
            // Move the file to the public directory
            $profilePhoto->move(public_path("profile_photos_perstataire"), $profilePhotoName);
        }

        
       
        Document::create([
            'id_prestataire'=>$pres['id'],
            'diplome_sertificat' => $DiplomeName,
            'photo' => $profilePhotoName,
        ]);
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
              

 
             return response()->json(["success"=>true,"message"=>"Please check your mail to reset  your password"],200);
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
            return view("remerciepourverfication");
        }
    }
}
