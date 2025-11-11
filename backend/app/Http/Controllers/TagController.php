<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\TagResource;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class TagController extends Controller
{
    /**
     * Display a list of all tags with usage counts.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $tags = Cache::remember('tags', 3600, function () {
            return Tag::withCount(['projects', 'posts'])
                ->orderBy('name')
                ->get();
        });

        return ApiResponse::success(
            TagResource::collection($tags),
            'Tags retrieved successfully'
        );
    }
}
