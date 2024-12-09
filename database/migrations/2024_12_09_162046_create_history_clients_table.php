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
        Schema::create('history_clients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamp('date_sending_message')->nullable();
            $table->string('service'); 
            $table->string('type_service'); 
            $table->unsignedBigInteger('prestataire_id'); // Add a foreign key column
            $table->foreign('prestataire_id')->references('id')->on('prestataires')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('history_clients');
    }
};
