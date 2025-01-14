<?php

namespace App\Http\Controllers;

use App\Models\AventageServive;
use App\Models\QestionsServive;
use App\Models\Services;
use App\Models\SousService;
use App\Models\ServicePropose;
use App\Models\ServiveContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ServicesController extends Controller
{
    public function getserviceName($id){

        $getService = Services::where('id', $id)->value('serviceName');


        return response()->json($getService);
    }

    public function index($service){

        $getServiceId = Services::where('serviceName', $service)->value('id');
        $sousServices = SousService::where('service_id',$getServiceId)->get();


        return response()->json($sousServices);
    }

    // service propose

    public function getAllServices(){
       $servive=ServicePropose::All();
       if (!$servive) {
        return response()->json(['error' => 'No data found'], 404);
       }
       return response()->json($servive);
    }




    public function storeService(Request $request)
    {
        DB::beginTransaction();

        $request->validate([
            'nomService' => 'required|string',
            'catId' => 'required|integer',
            'titre' => 'required|string',
            'slogan' => 'required|string',
            'introduction' => 'required|string',
            'description' => 'required|string',
            'PNC' => 'required|string',
            'selectedImage' => 'nullable|image',
            'selectedTypeServiceImage' => 'nullable|image',
            'aventagesImage' => 'nullable|image',
            'isPro' => 'required|integer',
            'icon' => 'nullable|image',
            'faqInputs' => 'required|string',  // Expecting a stringified array
            'avantageValues' => 'required|string',  // Expecting a stringified array
            'serviceTypeValues' => 'required|string',  // Expecting a stringified array
        ]);

        try {
            $selectedTypeServiceImage = "";
            $aventagesImage = "";
            $imageHeader = "";
            $icon = "";

            if ($request->hasFile('icon')) {
                $file = $request->file('icon');
                $destinationPath = public_path('images');
                if (!File::exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0777, true);
                }
                $fileName = time() . '-' . $file->getClientOriginalName();
                $file->move($destinationPath, $fileName);
                $icon = 'images/' . $fileName;
            }
            // Step 1: Insert into the 'services' table
            $service = Services::create([
                'serviceName' => $request->nomService,
                'icon' => $icon,
                'PRO' =>  $request->isPro,
                'category_id' => $request->catId,
            ]);

            if ($request->hasFile('selectedImage')) {
                $file = $request->file('selectedImage');
                $destinationPath = public_path('images');
                if (!File::exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0777, true);
                }
                $fileName = time() . '-' . $file->getClientOriginalName();
                $file->move($destinationPath, $fileName);
                $imageHeader = 'images/' . $fileName;
            }

            // Handle aventagesImage file upload
            if ($request->hasFile('aventagesImage')) {
                $file = $request->file('aventagesImage');
                $destinationPath = public_path('images');
                if (!File::exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0777, true);
                }
                $fileName = time() . '-' . $file->getClientOriginalName();
                $file->move($destinationPath, $fileName);
                $aventagesImage = 'images/' . $fileName;
            }

            // Handle selectedTypeServiceImage file upload
            if ($request->hasFile('selectedTypeServiceImage')) {
                $file = $request->file('selectedTypeServiceImage');
                $destinationPath = public_path('images');
                if (!File::exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0777, true);
                }
                $fileName = time() . '-' . $file->getClientOriginalName();
                $file->move($destinationPath, $fileName);
                $selectedTypeServiceImage = 'images/' . $fileName;
            }


            // Step 2: Insert into 'service_content' table, using $service->id
            $serviceContent = ServiveContent::create([
                'service_id' => $service->id,
                'titre' => $request->titre,
                'slogan' => $request->slogan,
                'introduction' => $request->introduction,
                'description' => $request->description,
                // 'PourquoiNousChoisir' => $request->PNC,
                'imageHeader' => $imageHeader,
                'imageTypeServices' => $selectedTypeServiceImage,
                'imageaventage' => $aventagesImage,
            ]);

            // Decode faqInputs and avantageValues from JSON to arrays
            $faqInputs = json_decode($request->faqInputs, true);
            $avantageValues = json_decode($request->avantageValues, true);
            $serviceTypeValues = json_decode($request->serviceTypeValues, true);
            $pnc = json_decode($request->PNC, true);

            // Insert into 'faq' table
            foreach ($faqInputs as $faq) {
                QestionsServive::create([
                    'service_id' => $service->id,
                    'questions' => $faq['question'],
                    'reponse' => $faq['response'],
                ]);
            }

            // Insert into 'avantage' table
            foreach ($avantageValues as $avantage) {
                AventageServive::create([
                    'service_id' => $service->id,
                    'Aventage' => $avantage,
                ]);
            }


            foreach ($serviceTypeValues as $serviceval) {
                SousService::create([
                    'service_id' => $service->id,
                    'sousService' => $serviceval,
                ]);
            }
            foreach ($pnc as $PN) {
                SousService::create([
                    'service_id' => $service->id,
                    'sousService' => $PN,
                ]);
            }

            // If all queries succeed, commit the transaction
            DB::commit();

            return response()->json(['message' => 'Service and related data created successfully!'], 200);
        } catch (\Exception $e) {
            // If any query fails, roll back the transaction
            DB::rollBack();
            return response()->json(['message' => 'Error storing service data! ' . $e->getMessage()], 500);
        }
    }


    public function supprimerService($id){
        try {
            // Find the category by ID, or return a 404 response if not found
            $service = Services::findOrFail($id);

            // Delete the category
            $service->delete();

            return response()->json(['message' => 'Catégorie supprimée avec succès.'], 200);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Erreur lors de la suppression de la catégorie', ['message' => $e->getMessage(), 'trace' => $e->getTrace()]);

            return response()->json(['error' => 'Erreur lors de la suppression de la catégorie.'], 500);
        }
    }

}
