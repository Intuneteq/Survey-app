<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\AnswerResource;
use App\Http\Resources\SurveyResourceDashboard;
use App\Mail\EmailVerification;
use App\Models\Survey;
use App\Models\Answer;
use Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Mail;

class UserController extends Controller
{
    public function me(Request $request)
    {
        return $request->user();
    }

    public function dashboard(Request $request)
    {
        // Find user
        $user = $request->user();

        // Total number of surveys
        $total = Survey::query()->where('user_id', $user->id)->count();

        // Latest survey
        $latest = Survey::query()->where('user_id', $user->id)->latest('created_at')->first();

        // Total Number of answers
        $totalAnswers = Answer::query()
            ->join('surveys', 'answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->count();


        $latestAnswers = Answer::query()
            ->join('surveys', 'answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->orderBy('end_date', 'DESC')
            ->limit(5)
            ->getModels('answers.*');

        return [
            'totalSurveys' => $total,
            'latestSurveys' => $latest ? new SurveyResourceDashboard($latest) : null,
            'totalAnswers' => $totalAnswers,
            'latestAnswers' => AnswerResource::collection($latestAnswers)
        ];
    }

    public function update(UpdateUserRequest $request)
    {
        $validated = $request->validated();

        $user = Auth::user();

        $user->name = $validated['name'] ?? $user->name;
        $user->email = $validated['email'] ?? $user->email;
        $user->email_verified_at = $validated['email'] ? null : $user->email_verified_at;
        $user->save();

        Mail::to($user)->send(new EmailVerification($user));

        return new JsonResponse($user);
    }
}
