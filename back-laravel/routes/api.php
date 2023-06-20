<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InscritosController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/create', [InscritosController::class, 'create']);
Route::get('/', [InscritosController::class, 'get']);
Route::delete('/delete/{id}', [InscritosController::class, 'destroy']);
Route::put('/update/{id}', [InscritosController::class, 'update']);
Route::get('/eventos', [InscritosController::class, 'getEventos']);
