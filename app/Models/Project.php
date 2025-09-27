<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
        protected $fillable = [
            'name_ar',
            'name_en',
            'name_tr',
            'description_ar',
            'description_en',
            'description_tr',
            'category_ar',
            'category_en',
            'category_tr',
            'project_url',
            'image'
            ];
            
}
