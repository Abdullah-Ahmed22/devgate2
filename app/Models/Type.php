<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{

    protected $fillable = ['project_type'];

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }
}
