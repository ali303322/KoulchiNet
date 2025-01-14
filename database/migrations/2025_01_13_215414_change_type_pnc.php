<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pncs', function (Blueprint $table) {
            $table->longText('porQouiNousChoisire')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pncs', function (Blueprint $table) {
            $table->string('porQouiNousChoisire')->change();
        });
    }
};
