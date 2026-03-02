<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutTitle extends Model
{
    protected $table = 'about_titles';

    protected $fillable = [
        'title',
        'description',
        'text',
    ];
}
