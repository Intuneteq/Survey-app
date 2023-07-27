<?php

namespace App\Http\Controllers;

use App\Enums\QuestionTypeEnum;
use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Models\SurveyQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class SurveyController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return SurveyResource::collection(
            Survey::where('user_id', $user->id)->orderBy('created_at', 'desc')->paginate(10)
        );
    }

    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();

        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);  // Implement s3 storage
            $data['image'] = $relativePath;
        }

        // Create survey
        $survey = Survey::create($data);

        // Create new questions
        // TODO: WRAP IN TRANSACTION
        foreach ($data['questions'] as $question) {
            $question['survey_id'] = $survey->id;
            $this->createQuestion($question);
        }

        return new SurveyResource($survey);
    }

    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();

        // Validate user created survey
        if ($user->id !== $survey->user_id) {
            return abort(403, 'Unauthorized action');
        }

        return new SurveyResource($survey);
    }

    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();

        // dd('data to be updated', $data);

        // Check if image was given and save on local file system.
        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            // If there is an old image, delete it.
            if ($survey->image) {
                $absolutePath = public_path($survey->image);

                dd('update image absolute path', $absolutePath);

                File::delete($absolutePath);
            }
        }

        $survey->update($data);

        // dd('Questions', $survey->questions());

        // dd('Pluck method', $survey->questions()->pluck('id'));

        // Get ids as plain array of existing questions
        $existingIds = $survey->questions()->pluck('id')->toArray();

        // dd('existing Ids', $existingIds);

        // Get Id as plain array of new questions
        $newIds = Arr::pluck($data['questons'], 'id');

        dd('mew Ids' . $newIds);

        // Find Questions to delete
        $toDelete = array_diff($existingIds, $newIds);

        // Find Questions to add
        $toAdd = array_diff($newIds, $existingIds);

        // Delete Questions in toDelete Array
        SurveyQuestion::destroy($toDelete);

        // Create new questions
        foreach ($data['questions'] as $question) {
            if (in_array($question['id'], $toAdd)) {
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }
        }

        // Update existing questions
        $questionMap = collect($data['questions'])->keyBy('id');

        dd('question map', $questionMap);

        foreach ($survey->questions as $question->id) {
            if (isset($questionMap[$question->id])) {
                $this->updateQuestion($question, $questionMap[$question->id]);
            }
        }

        return new SurveyResource($survey);
    }

    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403, 'Unauthorized action.');
        }

        $survey->delete();

        // If there is an old image, delete it
        if ($survey->image) {
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }

        return response('', 204);
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
                throw new \Exception('invalid image type');
            }

            $image = str_replace(' ', '+', $image);

            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decoded failed');
            }
        } else {
            throw new \Exception('Did not match data URI with image data');
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

    private function createQuestion($data)
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

        return SurveyQuestion::create($validator->validated());
    }

    private function updateQuestion(SurveyQuestion $question, $data)
    {
        // dd('updating question', $data);
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }

        $validator = Validator::make($data, [
            'id' => 'exists:App\Models\SurveyQuestion,id',
            'question' => 'required|string',
            'type' => ['required', new Enum(QuestionTypeEnum::class)],
            'description' => 'nullable|string',
            'data' => 'present',
        ]);

        return $question->update($validator->validated());
    }
}
