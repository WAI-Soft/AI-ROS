<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Handle admin login request.
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        // Verify user exists and password is correct
        if (!$user || !Hash::check($request->password, $user->password)) {
            return ApiResponse::error(
                'Invalid credentials',
                ['email' => ['The provided credentials are incorrect.']],
                401
            );
        }

        // Generate Sanctum token
        $token = $user->createToken('admin-token', ['*'], now()->addMinutes(30))->plainTextToken;

        return ApiResponse::success(
            [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
                'token' => $token,
                'expires_at' => now()->addMinutes(30)->toIso8601String(),
            ],
            'Login successful'
        );
    }

    /**
     * Handle admin logout request.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        // Revoke the current user's token
        $request->user()->currentAccessToken()->delete();

        return ApiResponse::success(
            null,
            'Logout successful'
        );
    }

    /**
     * Get the authenticated user's information.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return ApiResponse::success(
            [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'avatar' => $user->avatar,
                'bio' => $user->bio,
            ],
            'User information retrieved successfully'
        );
    }
}
