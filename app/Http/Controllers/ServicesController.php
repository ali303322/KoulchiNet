<?php

namespace App\Http\Controllers;

use App\Models\Services;
use App\Models\SousService;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    public function index($service){

        $getServiceId = Services::where('serviceName', $service)->value('id');
        $sousServices = SousService::where('service_id',$getServiceId)->get();


        return response()->json($sousServices);
    }
}

