<?php

namespace App\Http\Controllers;
use App\Models\Client;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use Illuminate\Http\Request;

class ClientController extends Controller
{
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
            // Generate a unique filename to prevent overwriting
            $profilePhotoName = time() . '_' . $profilePhoto->getClientOriginalName();
            // Move the file to the public directory
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
 
        try 
        {
            $clientEmail=Client::Where("email",$validatedData["email"])->get();
            if (count($clientEmail)>0) 
           {
             $data["Url"]="http://localhost:8000/api/verfy_email_client/".$request->email."/".$token;
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
        $client=Client::Where("email",$email)->first();
        if ($client["email_verification_token"]==$token) {
            $client['email_verified_at']=Carbon::now()->format('Y-m-d H:i:s');
            $client->save();
            return view("remerciepourverfication");
        }
    }
}
