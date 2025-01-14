<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function contactMessage(Request $request){
        $validatedData = $request->validate([
            'NomComplet'=> 'required|string|max:255',
            'email' => 'required|string|max:255',
            'subjet' => 'required|string|max:255',
            'message' => 'required|string|max:50',
        ]);


        if($validatedData){
            Mail::send('ContactMessage', ['Data' => $validatedData], function ($message) use ($validatedData) {
                $message->to('admink@mailnesia.com')
                    ->subject('Nouvelle Message Contact a envoyer');
            });
        }

    }
}
