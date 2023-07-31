<?php

namespace App\Repositories;

use App\Exceptions\BadRequestException;
use App\Models\Survey;
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

    public function update()
    {
    }

    public function forceDelete()
    {
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
