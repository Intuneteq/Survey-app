<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Users
    Route::get('/users/me', [UserController::class, 'me']);

    // Surveys
    Route::apiResource('surveys', SurveyController::class);
    Route::get('surveys/slugs/{survey:slug}', [SurveyController::class, 'findBySlug'])->withoutMiddleware('auth:sanctum');
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
