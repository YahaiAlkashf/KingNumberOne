<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
        protected $fillable = [
            'question_ar',
            'question_en',
            'question_tr',
            'answer_ar',
            'answer_en',
            'answer_tr'
        ];
}
