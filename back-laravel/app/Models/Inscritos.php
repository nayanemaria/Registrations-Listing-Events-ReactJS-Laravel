<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inscritos extends Model
{
    public $timestamps = false;

    protected $fillable = ["nome", "email", "cpf", "id_evento", "nome_evento"];

    protected $attributes = [
        'delayed' => false,
    ];

}
