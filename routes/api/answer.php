<?php

use App\Http\Controllers\AnswerController;
use Illuminate\Support\Facades\Route;

Route::group([
    'as' => 'answer.',
    'namespace' => "\App\Http\Controllers",
    'prefix' => 'answers',
    'middleware' => 'auth:api'
], function () {
    Route::get('/surveys/{survey}', [AnswerController::class, 'index']);
    Route::post('/surveys/{survey}', [AnswerController::class, 'store']);

    Route::post('/{survey}/answer', [AnswerController::class, 'storeAnswer'])->withoutMiddleware('auth:api');
});
