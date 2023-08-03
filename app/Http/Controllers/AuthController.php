<?php

namespace App\Http\Controllers;

use App\Enums\OAuthTypeEnum;
use App\Exceptions\BadRequestException;
use App\Exceptions\UnprocessableException;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\OAuthRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\OAuthIdentities;
use App\Models\User;
use DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    private $token_name = 'Personal Access Token';

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken($this->token_name)->accessToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            throw new BadRequestException('The Provided credentials are not correct');
        }

        /** @var \App\Models\User $user **/
        $user = Auth::user();

        $token = $user->createToken($this->token_name)->accessToken;

        return new JsonResponse([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user **/
        $user = Auth::user();

        // Revoke the token that was used to authenticate the current request...
        $user->token()->delete();

        return response([
            'success' => true
        ]);
    }

    public function oAuthRedirect(Request $request)
    {
        $provider = $request->query('provider');

        $validator = Validator::make(['provider' => $provider], [
            'provider' => ['required', new Enum(OAuthTypeEnum::class)]

        ]);

        if ($validator->fails()) {
            throw new UnprocessableException($validator->errors()->first());
        }

        $auth_code = Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();

        return $auth_code;
    }

    public function oAuth(OAuthRequest $request)
    {
        $validated = $request->validated();

        $oauthUser = null;
        try {
            $oauthUser = Socialite::driver($validated['provider'])->stateless()->user();
        } catch (\Throwable $th) {
            throw new BadRequestException($th->getMessage());
        }

        $foundUser = User::where('email', '=', $oauthUser->email)
            ->first();

        $user = null;
        if (!$foundUser) {
            $user = DB::transaction(function () use ($oauthUser, $validated) {
                $user = User::create([
                    'name' => $oauthUser->name,
                    'email' => $oauthUser->email
                ]);

                OAuthIdentities::create([
                    'provider_id' => $oauthUser->id,
                    'provider_name' => $validated['provider'],
                    'user_id' => $user->id
                ]);
                return $user;
            });
        }

        if ($foundUser) {
            // Find identity
            $identify = OAuthIdentities::where('provider_id', '=', $oauthUser->id)
                ->where('provider_name', '=', $validated['provider'])
                ->where('user_id', '=', $foundUser->id)
                ->first();

            if (!$identify) {
                OAuthIdentities::create([
                    'provider_id' => $oauthUser->id,
                    'provider_name' => $validated['provider'],
                    'user_id' => $foundUser->id
                ]);
            }

            Auth::login($foundUser);
            $user = Auth::user();
        }

        $token = $user->createToken($this->token_name)->accessToken;

        return new JsonResponse([
            'user' => $user,
            'token' => $token
        ]);
    }
}
