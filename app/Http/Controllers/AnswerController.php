<?php

namespace App\Http\Controllers;

use App\Exceptions\BadRequestException;
use App\Models\Answer;
use App\Http\Requests\StoreAnswerRequest;
use App\Http\Requests\UpdateAnswerRequest;
use App\Models\Question;
use App\Models\Survey;
use App\Models\SurveyQuestionAnswer;
use App\Repositories\AnswerRepository;

class AnswerController extends Controller
{
    public function __construct(
        protected AnswerRepository $answerRepository
    ) {
    }

    public function index()
    {
        //
    }


    public function store(StoreAnswerRequest $request, Survey $survey)
    {
        $validated = $request->validated();

       $answer = $this->answerRepository->create($survey, $validated);

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
