<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Services\StatsService;
use Illuminate\Http\JsonResponse;

class StatsController extends Controller
{
    protected StatsService $statsService;

    public function __construct(StatsService $statsService)
    {
        $this->statsService = $statsService;
    }

    /**
     * Display homepage statistics with caching.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $stats = $this->statsService->getHomepageStats();

        return ApiResponse::success(
            $stats,
            'Statistics retrieved successfully'
        );
    }
}
