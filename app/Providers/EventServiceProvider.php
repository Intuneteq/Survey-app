<?php

namespace App\Providers;

use App\Events\Registered;
use App\Events\SurveyAnswer;
use App\Listeners\SendEmailVerification;
use App\Listeners\SendRegistrationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerification::class,
            SendRegistrationNotification::class
        ],

        SurveyAnswer::class => [
            SendSurveyAnswerEmailNotification::class,
        ]
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
