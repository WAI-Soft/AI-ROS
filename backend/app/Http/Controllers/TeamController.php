<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\TeamMemberResource;
use App\Models\TeamMember;
use Illuminate\Http\JsonResponse;

class TeamController extends Controller
{
    /**
     * Display a list of all team members ordered by display order.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $teamMembers = TeamMember::orderBy('order')
            ->orderBy('name')
            ->get();

        return ApiResponse::success(
            TeamMemberResource::collection($teamMembers),
            'Team members retrieved successfully'
        );
    }
}
