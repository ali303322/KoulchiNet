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
        Schema::table('service_content', function (Blueprint $table) {
            $table->dropColumn('PourquoiNousChoisir');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('service_content', function (Blueprint $table) {
            $table->string('PourquoiNousChoisir');
        });
    }
};
