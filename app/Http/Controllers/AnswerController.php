<?php

namespace App\Http\Controllers;

use App\Events\SurveyAnswer;
use App\Exceptions\BadRequestException;
use App\Models\Answer;
use App\Http\Requests\StoreAnswerRequest;
use App\Http\Requests\UpdateAnswerRequest;
use App\Http\Resources\AnswerResource;
use App\Mail\MailSurveyAnswer;
use App\Models\Question;
use App\Models\Survey;
use App\Models\SurveyQuestionAnswer;
use App\Repositories\AnswerRepository;
use Illuminate\Http\JsonResponse;
use Mail;

class AnswerController extends Controller
{
    public function __construct(
        protected AnswerRepository $answerRepository
    ) {
    }

    public function index(Survey $survey)
    {
        $answer = Answer::where('survey_id', $survey->id)->first();

        // $question = $answer->survey();

        return $answer->question;

        // return new AnswerResource($answer);
    }


    public function store(StoreAnswerRequest $request, Survey $survey)
    {
        $validated = $request->validated();

        $answer = $this->answerRepository->create($survey, $validated);

        // Notify survey owner about new answer
        SurveyAnswer::dispatch($answer);

        return response("", 201);
    }


    public function show(Answer $answer)
    {
        //
    }


    public function update(UpdateAnswerRequest $request, Answer $answer)
    {
        //
    }


    public function destroy(Answer $answer)
    {
        //
    }
}
