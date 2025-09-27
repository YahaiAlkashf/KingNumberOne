<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WhyChooseUs extends Model
{
      protected $fillable = [
        'name_ar',
        'name_en',
        'name_tr',
        'description_ar',
        'description_en',
        'description_tr',
        'image'
        ];


}
