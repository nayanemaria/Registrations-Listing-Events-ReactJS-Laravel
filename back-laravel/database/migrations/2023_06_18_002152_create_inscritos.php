<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInscritos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inscritos', function (Blueprint $table) {
            $table->id();
            $table->string("nome", 220);
            $table->string('email', 220);
            $table->string("cpf", 14);
            $table->integer("id_evento");
            $table->string("nome_evento", 220);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inscritos');
    }
}
