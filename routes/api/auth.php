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

    Route::get('/redirect', [AuthController::class, 'oAuthRedirect']);
    Route::post('/oauth', [AuthController::class, 'oAuth']);

    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
    Route::post('/change-password', [AuthController::class, 'changePassword'])->middleware('auth:api');

    Route::get('/email/verify/{token}', [AuthController::class, 'emailVerification'])->middleware('auth:api');
    Route::post('/email/re-send', [AuthController::class, 'sendVerificationEmail'])->middleware('auth:api');
});
