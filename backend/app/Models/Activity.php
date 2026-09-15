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
}
