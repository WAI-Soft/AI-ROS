<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'featured_image' => $this->featured_image,
            'reading_time' => $this->reading_time,
            'status' => $this->status,
            'published_at' => $this->published_at?->toIso8601String(),
            'view_count' => $this->view_count,
            'author' => [
                'id' => $this->author?->id,
                'name' => $this->author?->name,
                'avatar' => $this->author?->avatar,
                'bio' => $this->author?->bio,
            ],
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
