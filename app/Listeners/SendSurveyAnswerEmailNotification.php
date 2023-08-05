<?php

namespace App\Listeners;

use App\Events\SurveyAnswer;
use App\Mail\MailSurveyAnswer;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendSurveyAnswerEmailNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

     /**
     * The name of the queue the job should be sent to.
     *
     * @var string|null
     */
    // public $queue = 'survey-answer';

    /**
     * The time (seconds) before the job should be processed.
     *
     * @var int
     */
    // public $delay = 1;

    /**
     * Handle the event.
     */
    public function handle(SurveyAnswer $event): void
    {
        $answer = $event->answer;
        $survey = $answer->survey;
        $user = $survey->user;
        Mail::to($user)->send(new MailSurveyAnswer($answer));
    }
}
