<?php

use App\Http\Controllers\AnswerController;
use Illuminate\Support\Facades\Route;

Route::group([
    'as' => 'answer.',
    'namespace' => "\App\Http\Controllers",
    'prefix' => 'answers',
    'middleware' => 'auth:api'
], function () {
    Route::post('/surveys/{survey}', [AnswerController::class, 'store']);

    Route::post('/{survey}/answer', [AnswerController::class, 'storeAnswer'])->withoutMiddleware('auth:api');
});
