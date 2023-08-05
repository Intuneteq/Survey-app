<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    // return view('welcome');

    $answer = App\Models\Answer::find("99cf11a1-cdd5-4bc8-b076-9f04ef63a1c7");

    return new App\Mail\MailSurveyAnswer($answer);
});
