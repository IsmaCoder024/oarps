<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //
    protected $table = 'tasks';
    protected $fillable = [
        'activity_id',
        'title',
        'description',
        'start_date',
        'end_date',

    ];

    public function assignments()
    {
        return $this->hasMany(Task_assignment::class, 'task_id');
    }
}
