<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
   protected $table = 'services';

    protected $fillable = [
        'title',
        'description',
        'image1',
        'text1',
        'text2',
        'image2',
        'text3',
    ];
}
