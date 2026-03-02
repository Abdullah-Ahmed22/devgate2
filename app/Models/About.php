<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $table = 'about';

    protected $fillable = [
        'image',
        'header',
        'header_description',
        'text1',
        'text2',
        'text3',
    ];
}
