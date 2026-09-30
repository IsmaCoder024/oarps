<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    //
    protected $table = 'activities';
    protected $fillable = [
        'title',
        'branch_id',
        'department_id',
        'created_by',
        'start_date',
        'end_date',
        'priority',
        'status',
        'remarks',

    ];

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function hod()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function taskAssignments()
    {
        return $this->hasManyThrough(
            Task_assignment::class,
            Task::class,
            'activity_id',
            'task_id',
            'id',
            'id'
        );
    }
}
