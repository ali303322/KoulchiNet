<?php

namespace App\Http\Controllers;

use App\Models\Arrondissement;
use App\Models\Ville;
use Illuminate\Http\Request;

class VilleController extends Controller
{

    //methode qui prendre toute les ville dans la collection villes dans database:

    public function index(){

        try {
            $villes = Ville::all();

            if (!$villes) {
                return response()->json(['error' => 'No data found'], 404);
            }

            return response()->json($villes);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching cities: ' . $e->getMessage()]);
        }
    }

    public function getDistricts($city){

        try {
            // Get all unique cities
            $getCityId = Ville::where('villePricipale',$city)->value('id');
            $districts = Arrondissement::where('ville_id' , $getCityId)->get('Arrondissement');

            return response()->json($districts);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching cities: ' . $e->getMessage()]);
        }
    }


    public function getArroundissement()
    {
        try {
            // Get all unique cities

            $districts = Arrondissement ::All();

            return response()->json($districts);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching cities: ' . $e->getMessage()]);
        }
    }

}
