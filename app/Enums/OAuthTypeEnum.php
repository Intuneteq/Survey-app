<?php

namespace App\Enums;

enum OAuthTypeEnum: string
{
    case Google = 'google';
    case Github = 'github';
    case Facebook = 'facebook';
    case Slack = 'slack';
}
