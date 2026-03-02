<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class aboutus extends Model
{
    protected $table = 'aboutus'; 

    protected $fillable = ['tittle', 'description'];
}
