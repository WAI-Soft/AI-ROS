<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\ProjectCollection;
use App\Http\Resources\ProjectResource;
use App\Services\ProjectService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    protected ProjectService $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    /**
     * Display a paginated list of published projects with optional filtering.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $filters = [
            'category' => $request->query('category'),
            'tag' => $request->query('tag'),
            'year' => $request->query('year'),
            'search' => $request->query('search'),
        ];

        $perPage = $request->query('per_page', 12);

        $projects = $this->projectService->getFilteredProjects($filters, $perPage);

        return ApiResponse::success(
            new ProjectCollection($projects),
            'Projects retrieved successfully'
        );
    }

    /**
     * Display a single project by slug.
     *
     * @param string $slug
     * @return JsonResponse
     */
    public function show(string $slug): JsonResponse
    {
        $project = $this->projectService->getProjectBySlug($slug);

        if (!$project) {
            return ApiResponse::notFound('Project not found');
        }

        // Increment view count
        $this->projectService->incrementViewCount($project->id);

        return ApiResponse::success(
            new ProjectResource($project),
            'Project retrieved successfully'
        );
    }
}
