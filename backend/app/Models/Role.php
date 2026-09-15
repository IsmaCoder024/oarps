<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    //

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     * 
     */

    protected $table = 'roles';
    protected $fillable = [
        'name',
        'description',
    ];
}

