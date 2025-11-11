<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::create([
            'name' => 'Admin User',
            'email' => 'admin@ai-ros.com',
            'password' => bcrypt('password'), // Change this in production!
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        \App\Models\User::create([
            'name' => 'Editor User',
            'email' => 'editor@ai-ros.com',
            'password' => bcrypt('password'), // Change this in production!
            'role' => 'editor',
            'email_verified_at' => now(),
        ]);
    }
}
