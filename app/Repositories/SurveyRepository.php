<?php

namespace App\Repositories;

use App\Models\Survey;
use Illuminate\Support\Facades\DB;

class SurveyRepository
{
    public function __construct(
        protected QuestionRepository $questionRepository
    ) {
    }

    public function create(array $data)
    {
        $survey = DB::transaction(function () use ($data) {
            $survey = Survey::create([
                'user_id' => data_get($data, 'user_id'),
                'title' => data_get($data, 'title'),
                'description' => data_get($data, 'description'),
                'image' => data_get($data, 'image'),
                'slug' => data_get($data, 'slug'),
                'status' => data_get($data, 'status'),
                'expire_date' => data_get($data, 'expire_date')
            ]);

            foreach ($data['questions'] as $question) {
                $question['survey_id'] = $survey->id;
                $this->questionRepository->create($question);
            }

            return $survey;
        });

        return $survey;
    }

    public function update()
    {
    }

    public function forceDelete()
    {
    }
}
