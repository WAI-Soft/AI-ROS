<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            ['name' => 'AI', 'slug' => 'ai'],
            ['name' => 'Machine Learning', 'slug' => 'machine-learning'],
            ['name' => 'IoT', 'slug' => 'iot'],
            ['name' => 'Robotics', 'slug' => 'robotics'],
            ['name' => 'Computer Vision', 'slug' => 'computer-vision'],
            ['name' => 'Cloud Computing', 'slug' => 'cloud-computing'],
            ['name' => 'Data Analytics', 'slug' => 'data-analytics'],
            ['name' => 'Automation', 'slug' => 'automation'],
            ['name' => 'Sensors', 'slug' => 'sensors'],
            ['name' => 'Drones', 'slug' => 'drones'],
            ['name' => 'Edge Computing', 'slug' => 'edge-computing'],
            ['name' => 'Sustainability', 'slug' => 'sustainability'],
        ];

        foreach ($tags as $tag) {
            \App\Models\Tag::create($tag);
        }
    }
}
