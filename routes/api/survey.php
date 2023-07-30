<?php

use App\Http\Controllers\SurveyController;
use Illuminate\Support\Facades\Route;

Route::group([
    'as' => 'survey.',
    'namespace' => "\App\Http\Controllers",
    'prefix' => 'surveys',
    'middleware' => 'auth:sanctum'
], function () {
    Route::get('/', [SurveyController::class, 'index']);
    Route::get('/{survey}', [SurveyController::class, 'show']);
    Route::post('/', [SurveyController::class, 'store']);
    Route::put('/{survey}', [SurveyController::class, 'update']);

    Route::get('/slugs/{survey:slug}', [SurveyController::class, 'findBySlug'])->withoutMiddleware('auth:sanctum');
    Route::post('/{survey}/answer', [SurveyController::class, 'storeAnswer'])->withoutMiddleware('auth:sanctum');
});
