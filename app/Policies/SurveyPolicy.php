<?php

namespace App\Policies;

use App\Models\Survey;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SurveyPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Survey $survey): bool
    {
        return $user->id === $survey->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Survey $survey): Response
    {
        return $user->id === $survey->user_id ? Response::allow()
            : Response::deny('You do not own this survey.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Survey $survey): Response
    {
        return $user->id === $survey->user_id ? Response::allow()
            : Response::deny('You do not own this survey.');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Survey $survey): Response
    {
        return $user->id === $survey->user_id ? Response::allow()
            : Response::deny('You do not own this survey.');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Survey $survey): Response
    {
        return $user->id === $survey->user_id ? Response::allow()
            : Response::deny('You do not own this survey.');
    }
}
