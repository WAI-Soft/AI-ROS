<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    /**
     * Display a list of all categories with project counts.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $categories = Cache::remember('categories', 3600, function () {
            return Category::withCount('projects')
                ->orderBy('name')
                ->get();
        });

        return ApiResponse::success(
            CategoryResource::collection($categories),
            'Categories retrieved successfully'
        );
    }
}
