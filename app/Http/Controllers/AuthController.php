<?php

namespace App\Http\Controllers;

use App\Exceptions\BadRequestException;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\OAuthRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\OAuthIdentities;
use App\Models\User;
use DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->accessToken;

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

        $token = $user->createToken('main')->accessToken;

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
        $user->tokens()->delete();

        return response([
            'success' => true
        ]);
    }

    public function oAuthRedirect()
    {
        $auth_code = Socialite::driver('google')->stateless()->redirect()->getTargetUrl();

        return $auth_code;
    }

    public function oAuth(OAuthRequest $request)
    {
        $validated = $request->validated();

        $oauthUser = null;
        try {
            $oauthUser = Socialite::driver($validated['type'])->stateless()->user();
        } catch (\Throwable $th) {
            throw new BadRequestException($th->getMessage());
        }

        $foundUser = User::where('email', '=', $oauthUser->email)
            ->first();

        // Find identity
        $identify = OAuthIdentities::where('provider_id', '=', $oauthUser->id)
            ->where('provider_name', '=', $validated['type'])
            ->where('user_id', '=', $foundUser?->id ?? '')
            ->first();

        $user = null;
        if (!$identify) {
            $user = DB::transaction(function () use ($oauthUser, $validated) {
                $user = User::create([
                    'name' => $oauthUser->name,
                    'email' => $oauthUser->email
                ]);

                OAuthIdentities::create([
                    'provider_id' => $oauthUser->id,
                    'provider_name' => $validated['type'],
                    'user_id' => $user->id
                ]);
                return $user;
            });
        } else {
            Auth::login($foundUser);
            $user = Auth::user();
        }

        $token = $user->createToken('main')->accessToken;

        return new JsonResponse([
            'user' => $user,
            'token' => $token
        ]);
    }
}
