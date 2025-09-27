<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialLink extends Model
{
        protected $fillable = [
        'platform',
        'url',
        'icon',
        'name_ar',
        'name_en',
        'name_tr'
        ];
}
