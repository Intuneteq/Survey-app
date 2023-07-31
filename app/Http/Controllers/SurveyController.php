<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurveyAnswerRequest;
use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Repositories\SurveyRepository;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class SurveyController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return SurveyResource::collection(
            Survey::where('user_id', $user->id)->orderBy('created_at', 'desc')->paginate(9)
        );
    }

    public function store(StoreSurveyRequest $request, SurveyRepository $repository)
    {
        $data = $request->validated();

        $survey = $repository->create($data);

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

    public function findBySlug(Survey $survey)
    {
        if (!$survey->status) {
            return response("survey is not active", 404);
        }

        $today = new DateTime();
        $expire_date = new DateTime($survey->expire_date);

        if ($today > $expire_date) return response("Survey expired", 404);

        return new SurveyResource($survey);
    }

    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();

        // // Check if image was given and save on local file system.
        // if (isset($data['image'])) {
        //     $relativePath = $this->saveImage($data['image']);
        //     $data['image'] = $relativePath;

        //     // If there is an old image, delete it.
        //     if ($survey->image) {
        //         $absolutePath = public_path($survey->image);

        //         File::delete($absolutePath);
        //     }
        // }

        // $survey->update($data);

        // // Get ids as plain array of existing questions
        // $existingIds = $survey->questions()->pluck('id')->toArray();

        // // Get Id as plain array of new questions
        // $newIds = Arr::pluck($data['questions'], 'id');

        // // Find Questions to delete
        // $toDelete = array_diff($existingIds, $newIds);

        // // Find Questions to add
        // $toAdd = array_diff($newIds, $existingIds);

        // // Delete Questions in toDelete Array
        // SurveyQuestion::destroy($toDelete);

        // // Create new questions
        // foreach ($data['questions'] as $question) {
        //     if (in_array($question['id'], $toAdd)) {
        //         $question['survey_id'] = $survey->id;
        //         $this->createQuestion($question);
        //     }
        // }

        // // Update existing questions
        // $questionMap = collect($data['questions'])->keyBy('id');



        // foreach ($survey->questions as $question) {
        //     if (isset($questionMap[$question->id])) {
        //         $this->updateQuestion($question, $questionMap[$question->id]);
        //     }
        // }

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

    // private function updateQuestion(SurveyQuestion $question, $data)
    // {
    //     // // dd('updating question', $data);
    //     // if (is_array($data['data'])) {
    //     //     $data['data'] = json_encode($data['data']);
    //     // }

    //     // $validator = Validator::make($data, [
    //     //     'id' => 'exists:App\Models\SurveyQuestion,id',
    //     //     'question' => 'required|string',
    //     //     'type' => ['required', new Enum(QuestionTypeEnum::class)],
    //     //     'description' => 'nullable|string',
    //     //     'data' => 'present',
    //     // ]);

    //     // return $question->update($validator->validated());
    // }

    public function storeAnswer(Survey $survey, StoreSurveyAnswerRequest $request)
    {
        $validated = $request->validated();

        // $surveyAnswer = SurveyAnswer::create([
        //     'survey_id' => $survey->id,
        //     'start_date' => date('Y-m-d H:i:s'),
        //     'end_date' => date('Y-m-d H:i:s')
        // ]);

        // foreach ($validated['answers'] as $questionId => $answer) {
        //     $question = SurveyQuestion::where(['id' => $questionId, 'survey_id' => $survey->id])->get();

        //     if(!$question) {
        //         return response("Invalid question ID: \" $questionId\"", 400);
        //     }

        //     $data = [
        //         'survey_question_id' => $questionId,
        //         'survey_answer_id' => $surveyAnswer->id,
        //         'answer' => is_array($answer) ? json_encode($answer) : $answer
        //     ];

        //     $questionAnswer = SurveyQuestionAnswer::create($data);
        // }

        // return response("", 201);
    }
}
