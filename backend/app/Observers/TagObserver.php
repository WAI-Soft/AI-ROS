<?php

namespace App\Observers;

use App\Models\Tag;
use App\Services\CacheService;

class TagObserver
{
    protected CacheService $cacheService;

    public function __construct(CacheService $cacheService)
    {
        $this->cacheService = $cacheService;
    }

    /**
     * Handle the Tag "created" event.
     */
    public function created(Tag $tag): void
    {
        $this->cacheService->clearTagCache();
    }

    /**
     * Handle the Tag "updated" event.
     */
    public function updated(Tag $tag): void
    {
        $this->cacheService->clearTagCache();
    }

    /**
     * Handle the Tag "deleted" event.
     */
    public function deleted(Tag $tag): void
    {
        $this->cacheService->clearTagCache();
    }
}
