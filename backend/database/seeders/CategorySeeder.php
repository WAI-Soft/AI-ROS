<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Smart Agriculture',
                'slug' => 'smart-agriculture',
                'description' => 'AI-driven solutions for precision farming, crop monitoring, and agricultural automation',
                'icon' => 'agriculture',
            ],
            [
                'name' => 'Smart Cities',
                'slug' => 'smart-cities',
                'description' => 'Intelligent urban infrastructure solutions for traffic management, public safety, and resource optimization',
                'icon' => 'city',
            ],
            [
                'name' => 'Industrial Automation',
                'slug' => 'industrial-automation',
                'description' => 'Robotics and AI solutions for manufacturing, logistics, and industrial process optimization',
                'icon' => 'factory',
            ],
        ];

        foreach ($categories as $category) {
            \App\Models\Category::create($category);
        }
    }
}
