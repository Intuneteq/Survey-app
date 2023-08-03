<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::group([
    'as' => 'auth.',
    'namespace' => "\App\Http\Controllers",
    'prefix' => 'auth'
], function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/redirect', [AuthController::class, 'oAuthRedirect'])->withoutMiddleware('auth:api');
    Route::post('/oauth', [AuthController::class, 'oAuth'])->withoutMiddleware('auth:api');

    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
});
