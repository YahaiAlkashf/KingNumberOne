<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactInfo extends Model
{
        protected $fillable = [
        'type',
        'value_ar',
        'value_en',
        'value_tr',
        'icon',
        'title_ar',
        'title_en',
        'title_tr'
        ];
}
