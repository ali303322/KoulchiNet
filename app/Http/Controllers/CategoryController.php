<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Services;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(){

        $services = Services::all();
        return response()->json($services);
    }
}
