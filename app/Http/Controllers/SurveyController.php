<?php

namespace App\Http\Controllers;

use App\Exceptions\NotFoundException;
use App\Exceptions\UnAuthorizedException;
use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Repositories\SurveyRepository;
use DateTime;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    public function __construct(
        protected SurveyRepository $repository
    ) {
    }

    public function index(Request $request)
    {
        $user = $request->user();

        return SurveyResource::collection(
            Survey::where('user_id', $user->id)->orderBy('created_at', 'desc')->paginate(9)
        );
    }

    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();

        $survey = $this->repository->create($data);

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

    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();

        $survey = $this->repository->update($survey, $data);

        return new SurveyResource($survey);
    }

    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            throw new UnAuthorizedException('Unauthorized action.');
        }

        $this->repository->forceDelete($survey);

        return response('', 204);
    }
}
