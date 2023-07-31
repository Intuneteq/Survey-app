<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'type', 'question', 'description', 'data', 'survey_id'];

    public function survey()
    {
        return $this->hasOne(Survey::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
