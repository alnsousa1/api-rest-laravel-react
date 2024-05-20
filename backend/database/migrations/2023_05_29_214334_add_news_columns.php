<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewsColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('developers', function (Blueprint $table) {
            $table-> string('sexo');
            $table-> date('data_nascimento');
            $table-> integer('idade');
            $table-> string('hobby', 255);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('developers', function (Blueprint $table) {
            $table->dropColumn('sexo');
            $table->dropColumn('dataNascimento');
            $table->dropColumn('idade');
            $table->dropColumn('hobby');
        });
    }
}
