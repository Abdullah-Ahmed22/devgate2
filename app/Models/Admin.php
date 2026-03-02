<?php

namespace App\Models;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{

   use HasApiTokens;

    protected $table = 'adminlogin';

    protected $fillable = [
        'email',
        'password',
        'role', 
    ];

    protected $hidden = [
        'password',
    ];
}
