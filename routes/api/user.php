<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::group([
    'as' => 'user.',
    'namespace' => "\App\Http\Controllers",
    'prefix' => 'users',
    'middleware' => 'auth:sanctum'
], function () {
    Route::get('/me', [UserController::class, 'me']);

    Route::get('/dashboard', [UserController::class, 'dashboard']);
});
