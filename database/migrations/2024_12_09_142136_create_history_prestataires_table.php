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
        Schema::create('history_prestataires', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamp('date_sending_message')->nullable();
            $table->string('type_service'); 
            $table->unsignedBigInteger('client_id'); // Add a foreign key column
            $table->foreign('client_id')->references('id')->on('clients')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('history_prestataires');
    }
};
