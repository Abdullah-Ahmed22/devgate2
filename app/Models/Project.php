<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'projects';

    protected $fillable = [
        'image1',
        'title',
        'text1',
        'text2',
        'text3',
        'image2',
        'image3',
    ];
}
