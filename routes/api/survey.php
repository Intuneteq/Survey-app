<?php

use App\Http\Controllers\SurveyController;
use Illuminate\Support\Facades\Route;

Route::group([
    'as' => 'survey.',
    'namespace' => "\App\Http\Controllers",
    'prefix' => 'surveys',
    'middleware' => 'auth:api'
], function () {
    Route::get('/', [SurveyController::class, 'index']);
    Route::get('/{survey}', [SurveyController::class, 'show']);
    Route::post('/', [SurveyController::class, 'store']);
    Route::put('/{survey}', [SurveyController::class, 'update']);
    Route::delete('/{survey}', [SurveyController::class, 'destroy']);

    Route::get('/slugs/{survey:slug}', [SurveyController::class, 'findBySlug'])->withoutMiddleware('auth:api');
});
