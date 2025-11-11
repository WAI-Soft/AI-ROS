<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'company',
        'email',
        'subject',
        'message',
        'reference_id',
        'status',
        'ip_address',
        'user_agent',
    ];

    /**
     * Scope a query to only include new submissions.
     */
    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    /**
     * Scope a query to only include in-progress submissions.
     */
    public function scopeInProgress($query)
    {
        return $query->where('status', 'in_progress');
    }

    /**
     * Scope a query to only include resolved submissions.
     */
    public function scopeResolved($query)
    {
        return $query->where('status', 'resolved');
    }
}
