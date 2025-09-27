<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OurNumber extends Model
{
        protected $fillable = [
        'number',
        'name_ar',
        'name_en',
        'name_tr'
        ];

}
