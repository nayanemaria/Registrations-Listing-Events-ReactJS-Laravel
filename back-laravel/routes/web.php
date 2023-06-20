<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InscritosController;


Route::post('/create',[InscritosController::class, 'create']);
Route::get('/',[InscritosController::class, 'show']);
Route::delete('/inscritos/{id}',[InscritosController::class, 'destroy']);
Route::put('/inscritos/{id}',[InscritosController::class, 'update']);
Route::get('/inscritos/{id}',[InscritosController::class, 'get']);
Route::get('/eventos',[InscritosController::class, 'getEventos']);
