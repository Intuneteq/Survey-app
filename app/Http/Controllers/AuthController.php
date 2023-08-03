<?php

namespace App\Http\Controllers;

use App\Exceptions\BadRequestException;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\OAuthRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\OAuthIdentities;
use App\Models\User;
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

        $userFromGoogle = Socialite::driver($validated['type'])->stateless()->user();

        // $user = User::

        // Find identity
        $identify = OAuthIdentities::where('provider_id', $userFromGoogle->id)
            ->where('provider_name', $validated['type'])
            ->where('user_id', )
            ->first();

        // $user = User::where('provider_name', '=', 'google')
        //     ->where('provider_id', '=', $userFromGoogle->id)
        //     ->first();

        return $userFromGoogle->name;

        // $userFromGoogle = Socialite::driver('google')->stateless()->user();

        // var_dump(json_encode($user));
        // $foundUser = User::where(['email' => $userFromGoogle->email, 'social_id' => $userFromGoogle->id])->get();


        // $user = null;
        // if (!$foundUser) {
        //     $user =  User::create([
        //         'name' => $userFromGoogle->name,
        //         'email' => $userFromGoogle->email,
        //         'google_id' => $userFromGoogle->id,
        //     ]);
        // } else {
        //     Auth::login($foundUser, true);
        //     $user = Auth::user();
        // }

        // $token = $user->createToken('main')->accessToken;

        // return new JsonResponse([
        //     'user' => $user,
        //     'token' => $token
        // ]);
    }
}
