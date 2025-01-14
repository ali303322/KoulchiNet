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
            $table->longText('introduction')->change(); // Change the column to LONGTEXT
            $table->longText('description')->change(); // Change the column to LONGTEXT
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('service_content', function (Blueprint $table) {
            $table->string('introduction', 255)->change(); // Revert to original type
            $table->string('description', 255)->change();  // Revert to original type
        });
    }
};
