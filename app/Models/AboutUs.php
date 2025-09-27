<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutUs extends Model
{
        protected $fillable = [
        'our_story_ar',
        'our_story_en',
        'our_story_tr',
        'our_vision_ar',
        'our_vision_en',
        'our_vision_tr',
        'our_mission_ar',
        'our_mission_en',
        'our_mission_tr'
         ];
}
