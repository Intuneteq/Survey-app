<?php

use App\Http\Controllers\QuestionController;
use Illuminate\Support\Facades\Route;

Route::group([
    'as' => 'question.',
    'namespace' => "\App\Http\Controllers",
    'prefix' => 'questions',
    'middleware' => 'auth:api'
], function () {
    Route::get('/surveys/{survey}', [QuestionController::class, 'index']);
});
