<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1')->group(function () {
    // Public API endpoints will be added here
    
    Route::get('/health', function () {
        return \App\Helpers\ApiResponse::success([
            'status' => 'healthy',
            'version' => '1.0.0',
            'timestamp' => now()->toIso8601String(),
        ], 'AI-ROS Backend API is running');
    });

    // Project routes
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{slug}', [ProjectController::class, 'show']);

    // Blog post routes
    Route::get('/posts', [BlogPostController::class, 'index']);
    Route::get('/posts/{slug}', [BlogPostController::class, 'show']);

    // Contact form route
    Route::post('/contact', [ContactController::class, 'store']);

    // Category and tag routes
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/tags', [TagController::class, 'index']);

    // Team and partner routes
    Route::get('/team', [TeamController::class, 'index']);
    Route::get('/partners', [PartnerController::class, 'index']);

    // Stats route
    Route::get('/stats', [StatsController::class, 'index']);

    // Authentication routes
    Route::post('/auth/login', [AuthController::class, 'login']);
    
    // Protected auth routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/me', [AuthController::class, 'me']);
    });
});
