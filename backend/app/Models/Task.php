<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //
    protected $table = 'Tasks';
    protected $fillable = [
        'activity_id',
        'title',
        'description',
        'created_by',
        'start_date',
        'end_date'
    ];
}
