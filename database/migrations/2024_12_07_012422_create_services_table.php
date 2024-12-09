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
        Schema::create('services', function (Blueprint $table) {
            $table->id();

            $table->string('name_service');
            $table->text('description_service');
            $table->integer('annees_experience');
            $table->string('statut');
            $table->foreignId('id_prestataire')->constrained('prestataires')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade'); // Clé étrangère vers catégories
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
