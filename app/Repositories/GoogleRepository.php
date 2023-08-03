<?php

namespace App\Repositories;

use App\Exceptions\UnAuthorizedException;
use Google_Client;

class GoogleRepository
{
    /**
     * Gets a google client instance
     * @return Google_Client
     *
     * @Intuneteq
     */

    private function getClient(): Google_Client
    {
        $clientSecret = base_path() . '/client_secret.json';
        $applicationName = 'Survey App';

        $client = new Google_Client();
        $client->setApplicationName($applicationName);
        $client->setAuthConfig($clientSecret);
        $client->setAccessType('offline'); // necessary for getting the refresh token
        $client->setApprovalPrompt('force'); // necessary for getting the refresh token

        // scopes determine what google endpoints we can access. keep it simple for now.
        $client->setScopes(
            [
                \Google\Service\Oauth2::USERINFO_PROFILE,
                \Google\Service\Oauth2::USERINFO_EMAIL,
                \Google\Service\Oauth2::OPENID,
                \Google\Service\Drive::DRIVE_METADATA_READONLY // allows reading of google drive metadata
            ]
        );
        $client->setIncludeGrantedScopes(true);

        return $client;
    }

    public function getAuthUrl(): string
    {
        $client = $this->getClient();

        // Generate Url
        $authUrl = $client->createAuthUrl();

        return $authUrl;
    }

    public function getUser(string $authCode)
    {
        $client = $this->getClient();

        /**
         * Exchange auth code for access token
         * Note: if we set 'access type' to 'force' and our access is 'offline', we get a refresh token. we want that.
         */

        $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);

        if(isset($accessToken['error'])) {
            throw new UnAuthorizedException('Token expired');
        }

        /**
         * Set the access token with google. In json format
         */

         $client->setAccessToken(json_encode($accessToken));

        /**
         * Get user's data from google
         */

         $service = new \Google\Service\Oauth2($client);
         $user = $service->userinfo->get();

         return  [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'access_token' => $accessToken,
         ];
    }
}
