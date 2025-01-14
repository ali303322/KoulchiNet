<?php

namespace App\Http\Controllers;

use App\Models\AventageServive;
use App\Models\PNC;
use App\Models\QestionsServive;
use App\Models\Services;
use App\Models\ServiveContent;
use App\Models\SousService;
use Error;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class AboutController extends Controller
{
    public function serviceAbout($service){
        $id = Services::where('serviceName',$service)->value('id');
        $serviceContent = ServiveContent::where('service_id',$id)->get();
        $aventages = AventageServive::where('service_id',$id)->get();
        $FAQ = QestionsServive::where('service_id',$id)->take(2)->get();
        $sousServices = SousService::where('service_id',$id)->get();
        $pnc = PNC::where('service_id',$id)->get();

        return response()->json([
            'serviceContent' => $serviceContent,
            'aventages' => $aventages,
            'FAQ' => $FAQ,
            'sousServices' => $sousServices,
            'PNC' => $pnc,
        ], 200);
    }




    public function show($id)
    {
        try {
            $serviceIcon = Services::where('id', $id)->first();
            $service = ServiveContent::where('service_id', $id)->first();
            $typesServ = SousService::where('service_id', $id)->get();
            $aventages = AventageServive::where('service_id', $id)->get();
            $faq = QestionsServive::where('service_id', $id)->get();
            $pnc = PNC::where('service_id', $id)->get();

            return response()->json([
                'service' => $service,
                'serviceDesc' => $serviceIcon,
                'typesServ' => $typesServ,
                'aventages' => $aventages,
                'faq' => $faq,
                'pnc' => $pnc,
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500); // Corrected the syntax here
        }
    }


    public function Edit(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'slogan' => 'required|string|max:255',
                'introduction' => 'required|string',
                'description' => 'required|string',
                'image' => 'nullable|sometimes|image|mimes:webp,jpeg,png,jpg,gif|max:2048',
                'types' => 'required|json',
                'aventageImage' => 'nullable|sometimes|image|mimes:webp,jpeg,png,jpg,gif|max:2048',
                'icon' => 'nullable|mimes:svg,jpeg,webp,png,jpg,gif|max:2048',
                'pro' => 'required|integer',
                'imageType' => 'nullable|sometimes|image|mimes:webp,jpeg,png,jpg,gif|max:2048',
                'faq' => 'required|json',
                'pnc' => 'required|json',
                'aventages' => 'required|json',
            ]);

            $service = ServiveContent::where('service_id', $id)->first();
            $serviceIcon = Services::where('id', $id)->first();


            $updateData = [
                'service_id' => $id,
                'titre' => $validated['titre'],
                'introduction' => $validated['introduction'],
                'description' => $validated['description'],
                'slogan' => $validated['slogan'],
            ];

            // Handle the image files (image, icon, aventageImage, imageType)
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $fileName = time() . '-' . $file->getClientOriginalName();
                $file->move(public_path('images'), $fileName);
                $updateData['imageHeader'] = 'images/' . $fileName;
            } else {
                $updateData['imageHeader'] = $service->imageHeader ?? null;
            }

            if ($request->hasFile('icon')) {
                $file = $request->file('icon');
                $fileName = time() . '-' . $file->getClientOriginalName();
                $file->move(public_path('images'), $fileName);
                $icon = 'images/' . $fileName;
                if ($serviceIcon) {
                    $serviceIcon->icon = $icon;
                    $serviceIcon->PRO = $validated['pro'];
                    $serviceIcon->save();
                } else {
                    return response()->json(['message' => 'Service not found'], 404);
                }
            }

            if ($request->hasFile('aventageImage')) {
                $file = $request->file('aventageImage');
                $fileName = time() . '-' . $file->getClientOriginalName();
                $file->move(public_path('images'), $fileName);
                $updateData['imageaventage'] = 'images/' . $fileName;
            } else {
                $updateData['imageaventage'] = $service->imageaventage ?? null;
            }

            if ($request->hasFile('imageType')) {
                $file = $request->file('imageType');
                $fileName = time() . '-' . $file->getClientOriginalName();
                $file->move(public_path('images'), $fileName);
                $updateData['imageTypeServices'] = 'images/' . $fileName;
            } else {
                $updateData['imageTypeServices'] = $service->imageTypeServices ?? null;
            }

            // Database transaction
            DB::transaction(function () use ($id, $updateData,$validated) {
                $service = ServiveContent::find($id);
                $serviceIcon = Services::find($id);


                if (!$service) {
                    $service = ServiveContent::create($updateData);
                } else {
                    $service->update($updateData);
                }

                $types = json_decode($validated['types'], true);
                $faq = json_decode($validated['faq'], true);
                $aventages = json_decode($validated['aventages'], true);
                $pnc = json_decode($validated['pnc'], true);

                if (json_last_error() !== JSON_ERROR_NONE) {
                    throw new \Exception('Invalid JSON: ' . json_last_error_msg());
                }

                $serviceIcon->sousServices()->delete();
                $serviceIcon->questionService()->delete();
                $serviceIcon->aventagesService()->delete();
                $serviceIcon->pncs()->delete();

                $serviceIcon->sousServices()->createMany(array_map(fn($type) => [
                    'service_id'=>$id,
                    'sousService' => $type,
                ], $types));

                $serviceIcon->questionService()->createMany(array_map(fn($faqItem) => [
                    'service_id'=>$id,
                    'questions' => $faqItem['questions'],
                    'reponse' => $faqItem['reponse'],
                ], $faq));

                $serviceIcon->aventagesService()->createMany(array_map(fn($aventage) => [
                    'service_id'=>$id,
                    'Aventage' => $aventage,
                ], $aventages));

                $serviceIcon->pncs()->createMany(array_map(function ($pncItem) use ($id) {
                    return [
                        'service_id' => $id,
                        'porQouiNousChoisire' => is_array($pncItem) ? json_encode($pncItem) : $pncItem,
                    ];
                }, $pnc));

            });

            return response()->json(['message' => 'Service mis à jour avec succès'], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


}
