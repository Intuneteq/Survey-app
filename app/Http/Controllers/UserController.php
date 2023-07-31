<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyResourceDashboard;
use App\Models\Survey;
use App\Models\Answer;
use Illuminate\Http\Request;

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
            'latestAnswers' => Answer::collection($latestAnswers)
        ];
    }
}
