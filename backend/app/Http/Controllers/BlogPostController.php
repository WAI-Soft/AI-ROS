<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Resources\BlogPostResource;
use App\Services\BlogPostService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    protected BlogPostService $blogPostService;

    public function __construct(BlogPostService $blogPostService)
    {
        $this->blogPostService = $blogPostService;
    }

    /**
     * Display a paginated list of published blog posts with optional filtering.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $filters = [
            'tag' => $request->query('tag'),
            'search' => $request->query('search'),
        ];

        $perPage = $request->query('per_page', 12);

        $posts = $this->blogPostService->getFilteredPosts($filters, $perPage);

        return ApiResponse::success(
            BlogPostResource::collection($posts)->response()->getData(true),
            'Blog posts retrieved successfully'
        );
    }

    /**
     * Display a single blog post by slug.
     *
     * @param string $slug
     * @return JsonResponse
     */
    public function show(string $slug): JsonResponse
    {
        $post = $this->blogPostService->getPostBySlug($slug);

        if (!$post) {
            return ApiResponse::notFound('Blog post not found');
        }

        // Increment view count
        $this->blogPostService->incrementViewCount($post->id);

        return ApiResponse::success(
            new BlogPostResource($post),
            'Blog post retrieved successfully'
        );
    }
}
