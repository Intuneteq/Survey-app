<?php

namespace App\Repositories;

use App\Exceptions\BadRequestException;
use App\Models\Answer;
use App\Models\Question;
use App\Models\Survey;
use Illuminate\Support\Facades\DB;

class AnswerRepository
{
    public function create(Survey $survey, array $data)
    {
        $surveyAnswer = DB::transaction(function () use ($survey, $data) {

            foreach ($data['answers'] as $questionId => $answer) {
                $question = Question::where(['id' => $questionId, 'survey_id' => $survey->id])->get();

                if (!$question) {
                    throw new BadRequestException("Invalid question ID: \" $questionId\"");
                }

                $surveyAnswer = Answer::create([
                    'survey_id' => $survey->id,
                    'question_id' => $questionId,
                    'answer' => is_array($answer) ? json_encode($answer) : $answer,
                    'start_date' => date('Y-m-d H:i:s'),
                    'end_date' => date('Y-m-d H:i:s')
                ]);
            }

            return $surveyAnswer;
        });

        return $surveyAnswer;
    }

    public function update()
    {
    }

    public function forceDelete()
    {
    }
}
