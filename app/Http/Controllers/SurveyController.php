<?php

namespace App\Http\Controllers;

use App\Exceptions\NotFoundException;
use App\Exceptions\UnAuthorizedException;
use App\Http\Requests\StoreSurveyAnswerRequest;
use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Repositories\SurveyRepository;
use DateTime;
use Illuminate\Http\Request;
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
            throw new UnAuthorizedException('Unauthorized action');
        }

        return new SurveyResource($survey);
    }

    public function findBySlug(Survey $survey)
    {
        if (!$survey->status) {
            throw new NotFoundException('survey is not active');
        }

        $today = new DateTime();
        $expire_date = new DateTime($survey->expire_date);

        if ($today > $expire_date) throw new NotFoundException('Survey expired');

        return new SurveyResource($survey);
    }

    public function update(UpdateSurveyRequest $request, Survey $survey, SurveyRepository $repository)
    {
        $data = $request->validated();

        $survey = $repository->update($survey, $data);

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
