<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DemandesController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\VilleController;
use App\Http\Controllers\PrestataireController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PaimentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TransactionController;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// le route get qui reteurn les villes
Route::get('villes', [VilleController::class, 'index'])->middleware('api');
Route::get('Arroundissement', [VilleController::class, 'getArroundissement'])->middleware('api');
Route::get('Districts/{ville}', [VilleController::class, 'getDistricts'])->middleware('api');

Route::get('services/{service}',[ServicesController::class , 'index']);
Route::get('prestataires',[PrestataireController::class , 'index']);
Route::get('prestataire/{id}',[PrestataireController::class , 'getPres']);

Route::get('services' , [CategoryController::class , 'index']);
Route::get('users' , [UsersController::class , 'index']);
Route::get('users/{id}' , [UsersController::class , 'getUserById']);


Route::get('categorieServices/{id}' , [CategoryController::class , 'categorieService']);
Route::get('categoriesWithPaginate',[CategoryController::class , 'CategoriesWithPagenate']);
Route::get('categories',[CategoryController::class , 'Categories']);
Route::post('AddCategories',[CategoryController::class , 'AddCategorie']);
Route::delete('supprimerCategorie/{id}',[CategoryController::class , 'supprimerCategorie']);
Route::delete('supprimerService/{id}',[ServicesController::class , 'supprimerService']);

Route::post('addServiceAndContent', [ServicesController::class , 'storeService']);



Route::get('service-content/{service}',[AboutController ::class , 'serviceAbout']);
Route::get('Edit-service-content/{id}',[AboutController ::class , 'show']);
Route::post('update-service-content/{id}',[AboutController ::class , 'Edit']);
Route::post('demande', [DemandesController::class, 'store']);

Route::get('prestataires',[PrestataireController::class , 'index']);
Route::post('prestataire',[PrestataireController::class , 'getPresFiltre']);
Route::post('prestataireByCity',[PrestataireController::class , 'getPresFiltreByCity']);
Route::post('prestataireByRegion',[PrestataireController::class , 'getPresFiltreByRegion']);
Route::get('prestataire/{id}',[PrestataireController::class , 'getPres']);


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:api')->group(function () {
Route::post('logout', [AuthController::class, 'logout']);
    // Other protected routes
});



Route::get('getserviceName/{id}', [ServicesController::class, 'getserviceName']);


Route::post('register_prestataire', [PrestataireController::class, 'Register']);
Route::get('verfy_email/{email}/{token}', [PrestataireController::class, 'verfyEmail']);

//client
Route::post('register_client', [ClientController::class, 'Register']);
Route::get('verfy_email_client/{email}/{token}', [ClientController::class, 'verfyEmail']);
Route::get("getclients",[ClientController::class,"getAllClient"]);
Route::delete("deleteclient/{id}",[ClientController::class,"deleteClient"]);
Route::get("getclientbyid/{id}",[ClientController::class,"getClientById"]);
Route::post('/client/{id}/change-password', [ClientController::class, 'changePassword']);

//History
Route::post('/createhistory', [HistoryController::class, 'createHistory']);
Route::get('/historyclient/{id}', [ClientController::class, 'showHistoryClient']);
Route::get('/historyprestataire/{id}', [PrestataireController::class, 'showHistoryWithClient']);
Route::get('/transaction', [TransactionController::class, 'getTransaction']);
Route::delete('/deleteTransaction/{id}', [TransactionController::class, 'DeleteTransaction']);
Route::post('/checkIfClientExists', [ClientController::class, 'checkIfClientExists']);
Route::get('/servicepropose', [ServicesController::class, 'getAllServices']);


Route::post('/checkIfPrestataireExists', [PrestataireController::class, 'checkIfPrestataireExists']);

Route::get('/getAllPrestataire', [PrestataireController::class, 'getAllPrestataire']);
Route::get('/getPrestataireById/{id}', [PrestataireController::class, 'getPrestataireById']);
Route::post('/activePrestataire/{id}', [PrestataireController::class, 'activePrestataire']);
Route::delete('/deleteprestataire/{id}', [PrestataireController::class, 'deletePrestataire']);
Route::post('/prestataire/{id}/change-password', [PrestataireController::class, 'changePassword']);
Route::post('createHistoryClientWithPrestataire', [ClientController::class, 'CreateHistoriqueClient']);
Route::get('getHistoryClient', [ClientController::class, 'getHistoryClient']);

Route::post('addHistory', [ClientController::class, 'AddHistory']);

Route::get('history/{id}',[HistoryController::class , 'getHistoryData']);

Route::post('/updatePrestataire/{id}', [PrestataireController::class, 'update']);

Route::post('/updateClient/{id}', [ClientController::class, 'update']);


Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::post('/', [ProductController::class, 'store']);
    Route::put('/{id}', [ProductController::class, 'update']);
    Route::delete('/{id}', [ProductController::class, 'destroy']);
});


Route::get('/prestataire/{id}/check-pro', [PrestataireController::class, 'checkProStatus']);

Route::post('/forgot-password' , [AuthController::class , 'forgot_password']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::post('/current-prestataire', [PrestataireController::class, 'getCurrentPrestataire']);


Route::post('/contactMessage', [ContactController::class, 'contactMessage']);

Route::post('/store-paiment', [PaimentController::class, 'storePaiment']);
Route::get('/getAllDemandes', [PaimentController::class, 'getAllDemandes']);
Route::get('/getPaiment/{id}', [PaimentController::class, 'getDemande']);
Route::post('/ApproverPrestataire', [PaimentController::class, 'ApproverPrestataire']);
Route::delete('/deletePaimentDemande/{id}', [PaimentController::class, 'deletePaiment']);


Route::post('/review', [ReviewController::class, 'store']);

Route::get('/messages/{role}/{id}', [MessageController::class, 'getConversations']);
// Route::post('/send-message/{prestataire_id}/{client_id}/{sender}/{message}', [MessageController::class, 'sendMessage']);
Route::post('/send-message', [MessageController::class, 'sendMessage']);

Route::get('prestataire/reviews/service/{serviceName}', [PrestataireController::class, 'getPrestataireByService']);
