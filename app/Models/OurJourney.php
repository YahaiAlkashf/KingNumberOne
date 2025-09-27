<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OurJourney extends Model
{
        protected $fillable = [
        'year',
        'name_ar',
        'name_en',
        'name_tr',
        'description_ar',
        'description_en',
        'description_tr'
        ];
}
