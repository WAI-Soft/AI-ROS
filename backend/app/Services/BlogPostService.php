<?php

namespace App\Services;

use App\Models\BlogPost;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class BlogPostService
{
    /**
     * Get filtered and paginated blog posts.
     *
     * @param array $filters
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getFilteredPosts(array $filters, int $perPage = 12): LengthAwarePaginator
    {
        $query = BlogPost::query()
            ->with(['author', 'tags'])
            ->published()
            ->orderBy('published_at', 'desc');

        // Filter by tag
        if (!empty($filters['tag'])) {
            $query->whereHas('tags', function ($q) use ($filters) {
                $q->where('slug', $filters['tag']);
            });
        }

        // Search in title, excerpt, and content
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        return $query->paginate($perPage);
    }

    /**
     * Get a single blog post by slug.
     *
     * @param string $slug
     * @return BlogPost|null
     */
    public function getPostBySlug(string $slug): ?BlogPost
    {
        return BlogPost::query()
            ->with(['author', 'tags'])
            ->published()
            ->where('slug', $slug)
            ->first();
    }

    /**
     * Increment the view count for a blog post.
     *
     * @param int $postId
     * @return void
     */
    public function incrementViewCount(int $postId): void
    {
        BlogPost::where('id', $postId)->increment('view_count');
    }

    /**
     * Get featured blog posts for homepage.
     *
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getFeaturedPosts(int $limit = 3)
    {
        return BlogPost::query()
            ->with(['author', 'tags'])
            ->published()
            ->orderBy('view_count', 'desc')
            ->orderBy('published_at', 'desc')
            ->limit($limit)
            ->get();
    }
}
