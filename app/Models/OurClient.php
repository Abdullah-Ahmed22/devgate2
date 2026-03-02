<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OurClient extends Model
{
   protected $table = 'ourclients';

    protected $fillable = [
        'image',
    ];
}
