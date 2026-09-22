<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Department extends Model
{
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     * 
     */

    protected $table = 'departments';
    protected $fillable = [
        'name',
        'branch_id',
        'hod_id',
        'description'
    ];

    public function activities(){
        return $this->hasMany(Activity::class, 'department_id');
    }


}
