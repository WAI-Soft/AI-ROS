<?php

namespace App\Providers;

use App\Models\Project;
use App\Models\Category;
use App\Models\Tag;
use App\Observers\ProjectObserver;
use App\Observers\CategoryObserver;
use App\Observers\TagObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register model observers for cache invalidation
        Project::observe(ProjectObserver::class);
        Category::observe(CategoryObserver::class);
        Tag::observe(TagObserver::class);
    }
}
