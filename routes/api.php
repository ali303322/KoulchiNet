<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\VilleController;
use App\Http\Controllers\PrestataireController;
use App\Http\Controllers\ClientController;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// le route get qui reteurn les villes
Route::get('villes', [VilleController::class, 'index'])->middleware('api');
Route::get('Districts/{ville}', [VilleController::class, 'getDistricts'])->middleware('api');

Route::get('services/{service}',[ServicesController::class , 'index']);

Route::get('services' , [CategoryController::class , 'index']);
Route::get('users' , [UsersController::class , 'index']);
Route::get('users/{id}' , [UsersController::class , 'getUserById']);

Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    // Other protected routes
});






Route::post('register_prestataire', [PrestataireController::class, 'Register']);
Route::get('verfy_email/{email}/{token}', [PrestataireController::class, 'verfyEmail']);

//client
Route::post('register_client', [ClientController::class, 'Register']);
Route::get('verfy_email_client/{email}/{token}', [ClientController::class, 'verfyEmail']);
//History prestataire
Route::post('createHistoryPrestataireWithClient', [PrestataireController::class, 'CreateHistoriqueClient']);
Route::get('getHistoryPrestataire', [PrestataireController::class, 'getHistoryPrestataire']);
//History Client



Route::post('createHistoryClientWithPrestataire', [ClientController::class, 'CreateHistoriqueClient']);
Route::get('getHistoryClient', [ClientController::class, 'getHistoryClient']);