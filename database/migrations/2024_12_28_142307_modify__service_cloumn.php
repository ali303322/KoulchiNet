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
        Schema::table('prestataires', function (Blueprint $table) {

            // Drop the column (if you need to change the type)
            $table->dropColumn('service');

            // Add the new foreign key column
            $table->unsignedBigInteger('service_id')->nullable(); // Adjust according to your needs

            // Add the foreign key constraint
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prestataires', function (Blueprint $table) {
            // Drop the foreign key and column
            $table->dropForeign(['service_id']);
            $table->dropColumn('service_id');

            // Add the old string column back (as 'service')
            $table->string('service')->nullable(); // Adjust accordingly
        });
    }
};
