<?php

namespace App\Repositories;

use App\Enums\QuestionTypeEnum;
use App\Models\Question;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;

class QuestionRepository
{
    public function create(array $data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }

        $validator = Validator::make($data, [
            'question' => 'required|string',
            'type' => ['required',  new Enum(QuestionTypeEnum::class)],
            'description' => 'nullable|string',
            'data' => 'present',
            'survey_id' => 'exists:\App\Models\Survey,id'
        ]);

        return Question::create($validator->validated());
    }

    public function update(Question $question, array $data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }

        $validator = Validator::make($data, [
            'id' => 'exists:App\Models\Question,id',
            'question' => 'required|string',
            'type' => ['required', new Enum(QuestionTypeEnum::class)],
            'description' => 'nullable|string',
            'data' => 'present',
        ]);

        return $question->update($validator->validated());
    }

    public function forceDelete()
    {
    }
}
