<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task_assignment extends Model
{
    //
    protected $table = 'task_assignments';
    protected $fillable = [
        'task_id',
        'assigned_by',
        'assigned_to',
        'status',
        'completed_at',
        'remarks',
        'rating',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id');
    }

    public function assignor()
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

}
