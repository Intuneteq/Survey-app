<?php

namespace App\Listeners;

use App\Events\SurveyAnswer;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendSurveyAnswerEmailNotification implements ShouldQueue
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
    public $queue = 'survey-answer';

    /**
     * The time (seconds) before the job should be processed.
     *
     * @var int
     */
    public $delay = 60;

    /**
     * Handle the event.
     */
    public function handle(SurveyAnswer $event): void
    {
        // $answer = $event->answer;
        // $survey = $event->survey;
    }
}
