<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VilleController;
use App\Http\Controllers\SecteurController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\FavorisController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\VistsController;









/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//villes
Route::get('/villes',[VilleController::class,"index"]);
Route::post('/villes',[VilleController::class,"store"]);
Route::delete('/villes/{id}',[VilleController::class,"destroy"]);

//categorie
Route::get('/categorie',[CategorieController::class,"index"]);
//secteurs
Route::get('/secteurs/{id}',[SecteurController::class,"index"]);
//client
Route::get('/client',[ClientController::class,"index"]);
Route::get('/client/{id}',[ClientController::class,"show"])->name("show");
Route::post('/client',[ClientController::class,"store"]);
Route::put('/client/{id}',[ClientController::class,"update"]);
Route::delete('/client/{id}',[ClientController::class,"destroy"]);
//annonce
Route::get('/annonce',[AnnonceController::class,"index"]);
Route::get('/filterAnnonce',[AnnonceController::class,"filterAnnonce"]);
Route::post('/annonce',[AnnonceController::class,"store"]);
Route::put("/changestatus/{id}",[AnnonceController::class,"changestatus"]);
Route::put('/annonce/{id}',[AnnonceController::class,"update"]);
Route::delete('/annonce/{id}',[AnnonceController::class,"destroy"]);

//favoris
Route::get('/favoris',[FavorisController::class,"index"]);
Route::get('/favoris/{id_client}',[FavorisController::class,"show"]);
Route::post('/favoris',[FavorisController::class,"store"]);
Route::delete('/favoris/{id_client}/{id_annonce}',[FavorisController::class,"destroy"]);

//auth
Route::post('/login',[AuthController::class,"login"]);
Route::post('/logout',[AuthController::class,"logout"]);

//image
Route::get('/image',[ImageController::class,"index"]);
Route::get('/image/{id_annonce}',[ImageController::class,"show"]);
Route::post('/image',[ImageController::class,"store"]);
Route::delete('/image/{id}',[ImageController::class,"destroy"]);

//admin
Route::get('/admin/statique',[AdminController::class,"statique"]);
Route::get('/admin/annonces',[AdminController::class,"annonces"]);
Route::get('/admin/clients',[AdminController::class,"clients"]);
Route::get('/admin/treeannonce',[AdminController::class,"treeannonce"]);
Route::get('/admin/DestroyClient/{id}',[AdminController::class,"DestroyClient"]);
Route::put('/admin/ChangerRole/{id}',[AdminController::class,"ChangerRole"]);
Route::put('/admin/ChangerPassword/{id}',[AdminController::class,"ChangerPassword"]);


//message
Route::post('/message',[MessageController::class,"store"]);
Route::get('/message',[MessageController::class,"index"]);
Route::get('/message/{id}',[MessageController::class,"show"]);

//vist 
// Route::get('/visit',[VistsController ::class,"index"]);
Route::post('/visit',[VistsController::class,"store"]);
Route::get('/visit/{id}',[VistsController ::class,"index"]);
Route::delete('/visit/{id}',[VistsController ::class,"destroy"]);







