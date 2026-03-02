<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactUs extends Model
{
    protected $table = 'contactus';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'message',
    ];
}
