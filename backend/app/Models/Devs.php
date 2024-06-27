<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devs extends Model
{
    use HasFactory;

    protected $table = 'developers';
    protected $fillable = ['nome', 'id_level', 'sexo', 'data_nascimento', 'idade', 'hobby'];
}
