<?php

namespace App\Observers;

use App\Models\Project;
use App\Services\CacheService;

class ProjectObserver
{
    protected CacheService $cacheService;

    public function __construct(CacheService $cacheService)
    {
        $this->cacheService = $cacheService;
    }

    /**
     * Handle the Project "created" event.
     */
    public function created(Project $project): void
    {
        $this->cacheService->clearProjectCache();
    }

    /**
     * Handle the Project "updated" event.
     */
    public function updated(Project $project): void
    {
        $this->cacheService->clearProjectCache();
    }

    /**
     * Handle the Project "deleted" event.
     */
    public function deleted(Project $project): void
    {
        $this->cacheService->clearProjectCache();
    }
}
