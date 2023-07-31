<?php

namespace App\Repositories;

use App\Exceptions\BadRequestException;
use App\Models\Question;
use App\Models\Survey;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class SurveyRepository
{
    public function __construct(
        protected QuestionRepository $questionRepository
    ) {
    }

    public function create(array $data)
    {
        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);  // Implement s3 storage
            $data['image'] = $relativePath;
        }

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

    public function update(Survey $survey, array $data)
    {
        $survey = DB::transaction(function () use ($survey, $data) {
            // Check if image was given and save on local file system.
            if (isset($data['image'])) {
                $relativePath = $this->saveImage($data['image']);
                $data['image'] = $relativePath;

                // If there is an old image, delete it.
                if ($survey->image) {
                    $absolutePath = public_path($survey->image);

                    File::delete($absolutePath);
                }
            }

            $survey->update($data);

            // Get ids as plain array of existing questions
            $existingIds = $survey->questions()->pluck('id')->toArray();

            // Get Id as plain array of new questions
            $newIds = Arr::pluck($data['questions'], 'id');

            // Find Questions to delete
            $toDelete = array_diff($existingIds, $newIds);

            // Find Questions to add
            $toAdd = array_diff($newIds, $existingIds);

            // Delete Questions in toDelete Array
            Question::destroy($toDelete);

            // Create new questions
            foreach ($data['questions'] as $question) {
                if (in_array($question['id'], $toAdd)) {
                    $question['survey_id'] = $survey->id;
                    $this->questionRepository->create($question);
                }
            }

            // Update existing questions
            $questionMap = collect($data['questions'])->keyBy('id');


            foreach ($survey->questions as $question) {
                if (isset($questionMap[$question->id])) {
                    $this->questionRepository->update($question, $questionMap[$question->id]);
                }
            }
            return $survey;
        });

        return $survey;
    }

    public function forceDelete(Survey $survey)
    {
        $deleted = $survey->delete();

        // If there is an old image, delete it
        if ($survey->image) {
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }

        return $deleted;
    }

    private function saveImage($image)
    {
        // Check if image is valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {

            // Take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1);

            // Get file extension
            $type = strtolower($type[1]);

            // Check if file is an image
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new BadRequestException('Invalid image type');
            }

            $image = str_replace(' ', '+', $image);

            $image = base64_decode($image);

            if ($image === false) {
                throw new BadRequestException('base64_decoded failed');
            }
        } else {
            throw new BadRequestException('Did not match data URI with image data');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;

        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }
}
