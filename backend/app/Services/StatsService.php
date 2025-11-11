<?php

namespace App\Services;

use App\Models\Project;
use App\Models\Partner;
use Illuminate\Support\Facades\Cache;

class StatsService
{
    /**
     * Cache TTL in seconds (15 minutes).
     */
    private const CACHE_TTL = 900;

    /**
     * Get homepage statistics with caching.
     *
     * @return array
     */
    public function getHomepageStats(): array
    {
        return Cache::remember('homepage_stats', self::CACHE_TTL, function () {
            return [
                'total_projects' => Project::where('status', 'published')->count(),
                'co2_saved' => $this->calculateCO2Saved(),
                'partner_count' => Partner::count(),
                'years_experience' => now()->year - 2015, // Assuming company started in 2015
            ];
        });
    }

    /**
     * Calculate total CO2 saved from project metrics.
     *
     * @return float
     */
    public function calculateCO2Saved(): float
    {
        $projects = Project::where('status', 'published')
            ->whereNotNull('key_metrics')
            ->get();

        $totalCO2 = 0;

        foreach ($projects as $project) {
            $metrics = $project->key_metrics;
            
            if (is_array($metrics)) {
                foreach ($metrics as $metric) {
                    // Look for CO2-related metrics
                    if (isset($metric['label']) && isset($metric['value'])) {
                        $label = strtolower($metric['label']);
                        
                        if (str_contains($label, 'co2') || str_contains($label, 'carbon')) {
                            // Extract numeric value
                            $value = $metric['value'];
                            if (is_numeric($value)) {
                                $totalCO2 += (float) $value;
                            } elseif (is_string($value)) {
                                // Try to extract number from string like "1,234 tons"
                                $numericValue = preg_replace('/[^0-9.]/', '', $value);
                                if (is_numeric($numericValue)) {
                                    $totalCO2 += (float) $numericValue;
                                }
                            }
                        }
                    }
                }
            }
        }

        return round($totalCO2, 2);
    }

    /**
     * Refresh the cached statistics.
     *
     * @return array
     */
    public function refreshCache(): array
    {
        Cache::forget('homepage_stats');
        return $this->getHomepageStats();
    }
}
