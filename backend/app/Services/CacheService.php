<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class CacheService
{
    /**
     * Clear all project-related caches.
     *
     * @return void
     */
    public function clearProjectCache(): void
    {
        Cache::forget('categories');
        Cache::forget('tags');
        Cache::forget('homepage_stats');
    }

    /**
     * Clear category cache.
     *
     * @return void
     */
    public function clearCategoryCache(): void
    {
        Cache::forget('categories');
        Cache::forget('homepage_stats');
    }

    /**
     * Clear tag cache.
     *
     * @return void
     */
    public function clearTagCache(): void
    {
        Cache::forget('tags');
    }

    /**
     * Clear stats cache.
     *
     * @return void
     */
    public function clearStatsCache(): void
    {
        Cache::forget('homepage_stats');
    }

    /**
     * Clear all application caches.
     *
     * @return void
     */
    public function clearAllCache(): void
    {
        Cache::flush();
    }
}
