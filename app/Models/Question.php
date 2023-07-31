<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Question extends Model
{
    use HasFactory;
    use HasUuids;

    protected $primaryKey = 'id';

    protected $keyType = 'string';

    public $incrementing = false;

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
