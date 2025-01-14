<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Prestataire;
use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:55',
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed'
        ]);

        $validatedData['password'] = bcrypt($request->password);

        $user = User::create($validatedData);

        $accessToken = Auth::login($user);

        return response(['user' => $user, 'access_token' => $accessToken]);
    }


    //login


    public function login(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $email = $request->input('email');
        $password = $request->input('password');

        // Check in Admin table
        $admin = User::where('email', $email)->first();
        if ($admin && Hash::check($password, $admin->password)) {
            return response()->json([
                'message' => 'Login successful',
                'role' => 'admin',
                'user' => $admin,
                'token' => $this->generateToken($admin),
            ]);
        }

        // Check in Prestataire table
        $prestataire = Prestataire::where('email', $email)->first();
        if ($prestataire && Hash::check($password, $prestataire->password)) {
            return response()->json([
                'message' => 'Login successful',
                'role' => 'prestataire',
                'user' => $prestataire,
                'email_verified_at'=>$prestataire->email_verified_at,
                'token' => $this->generateToken($prestataire),
            ]);
        }

        // Check in Client table
        $client = Client::where('email', $email)->first();
        if ($client && Hash::check($password, $client->password)) {
            return response()->json([
                'message' => 'Login successful',
                'role' => 'client',
                'user' => $client,
                'token' => $this->generateToken($client),
            ]);
        }

        // If no user found
        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    // Generate token for the user
    private function generateToken($user)
{
    $payload = [
        'iss' => "your-app-name", // Issuer of the token
        'sub' => $user->id, // Subject of the token (user ID)
        'iat' => time(), // Time when JWT was issued
        'exp' => time() + 60 * 60 // Expiration time (1 hour)
    ];

    return JWT::encode($payload, env('JWT_SECRET'), 'HS256');
}


    public function logout()
    {
        Auth::logout();
        return response(['message' => 'Successfully logged out']);
    }

    public function forgot_password(Request $request)
    {
        $email = $request->email;

        if ($email) {
            // Check if the email exists in any of the three tables
            $user = null;
            $table = null;

            // Check in 'users' table
            $user = User::where('email', $email)->first();
            if (!$user) {
                // Check in 'prestataires' table
                $user = Prestataire::where('email', $email)->first();
                $table = 'prestataires';
            }

            if (!$user) {
                // Check in 'clients' table
                $user = Client::where('email', $email)->first();
                $table = 'clients';
            }

            if ($user) {
                // Generate a unique reset token (using a random string)
                $token = $this->generateToken($user);

                // Store the reset token in a 'password_resets' table
                \DB::table('password_resets')->insert([
                    'email' => $email,
                    'token' => $token,
                    'created_at' => now(),
                ]);

                // Send reset password email with the token
                Mail::send('forgot_password', ['token' => $token], function ($message) use ($email) {
                    $message->to($email)
                            ->subject('Réinitialiser votre mot de passe');
                });

                return response()->json(['message' => 'Email envoyé. Vérifiez votre boîte mail.'], 200);
            }

            return response()->json(['error' => 'Email introuvable.'], 404);
        }

        return response()->json(['error' => 'Email requis.'], 400);
    }


    public function resetPassword(Request $request)
    {
          // Validate incoming request data
    $validatedData = $request->validate([
        'token' => 'required',
        'password' => 'required|confirmed|min:6',
    ]);

    // Retrieve the reset token from the database
    $resetRecord = DB::table('password_resets')->where('token', $validatedData['token'])->first();

    if (!$resetRecord) {
        return response()->json(['error' => 'Token invalide ou expiré.'], 400);
    }

    // Check if the token has expired (e.g., expires in 1 hour)
    if (Carbon::parse($resetRecord->created_at)->addHours(1)->isPast()) {
        return response()->json(['error' => 'Token expiré.'], 400);
    }

    // Find the user by email from the relevant table
    $user = null;
    $email = $resetRecord->email;

    // Check in 'users' table
    $user = User::where('email', $email)->first();
    if (!$user) {
        // Check in 'prestataires' table
        $user = Prestataire::where('email', $email)->first();
    }

    if (!$user) {
        // Check in 'clients' table
        $user = Client::where('email', $email)->first();
    }

    if ($user) {
        // Reset the user's password
        $user->password = bcrypt($request->password);
        $user->save();

        // Delete the token from the password_resets table
        DB::table('password_resets')->where('token', $request->token)->delete();

        return response()->json(['message' => 'Mot de passe réinitialisé avec succès.'], 200);
    }

    return response()->json(['error' => 'Utilisateur introuvable.'], 404);
    }
}
