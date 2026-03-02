<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teammate extends Model
{
    protected $table = 'teammate';

    protected $fillable = [
        'image',
        'description',
        'name',
        'position',
    ];
}
