<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

class ProjectService
{
    /**
     * Get filtered projects with pagination.
     *
     * @param array $filters
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getFilteredProjects(array $filters, int $perPage = 12): LengthAwarePaginator
    {
        $query = Project::query()
            ->with(['categories', 'tags', 'media'])
            ->published();

        // Filter by category
        if (!empty($filters['category'])) {
            $query->whereHas('categories', function (Builder $q) use ($filters) {
                $q->where('slug', $filters['category']);
            });
        }

        // Filter by tag
        if (!empty($filters['tag'])) {
            $query->whereHas('tags', function (Builder $q) use ($filters) {
                $q->where('slug', $filters['tag']);
            });
        }

        // Filter by year
        if (!empty($filters['year'])) {
            $query->where('year', $filters['year']);
        }

        // Search by title or excerpt
        if (!empty($filters['search'])) {
            $query->where(function (Builder $q) use ($filters) {
                $q->where('title', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('excerpt', 'like', '%' . $filters['search'] . '%');
            });
        }

        // Sorting
        $sortField = $filters['sort'] ?? 'created_at';
        $sortOrder = $filters['order'] ?? 'desc';
        
        $query->orderBy($sortField, $sortOrder);

        return $query->paginate($perPage);
    }

    /**
     * Get a single project by slug with relationships.
     *
     * @param string $slug
     * @return Project|null
     */
    public function getProjectBySlug(string $slug): ?Project
    {
        return Project::with(['categories', 'tags', 'media'])
            ->where('slug', $slug)
            ->published()
            ->first();
    }

    /**
     * Increment the view count for a project.
     *
     * @param int $projectId
     * @return bool
     */
    public function incrementViewCount(int $projectId): bool
    {
        return Project::where('id', $projectId)->increment('view_count');
    }

    /**
     * Get featured projects for homepage.
     *
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getFeaturedProjects(int $limit = 6)
    {
        return Project::with(['categories', 'tags'])
            ->published()
            ->featured()
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }
}
