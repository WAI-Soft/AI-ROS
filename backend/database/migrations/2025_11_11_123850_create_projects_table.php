<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->longText('description')->nullable();
            $table->string('banner_image_url', 2048)->nullable();
            $table->string('client')->nullable();
            $table->year('year');
            $table->string('location')->nullable();
            $table->json('key_metrics')->nullable();
            $table->json('tech_stack')->nullable();
            $table->enum('status', ['published', 'draft'])->default('draft');
            $table->boolean('featured')->default(false);
            $table->unsignedInteger('view_count')->default(0);
            $table->timestamps();

            // Indexes
            $table->index('slug');
            $table->index('status');
            $table->index('year');
            $table->index('featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
