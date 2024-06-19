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
        Schema::create('annonces', function (Blueprint $table) {
            $table->id();
            $table->string("titre");
            $table->string("description");
            $table->unsignedBigInteger("surface");
            $table->unsignedBigInteger("etage");
            $table->unsignedBigInteger("prix");
            $table->string("adresse");
            $table->string("statut");
            $table->string("typeAnnonce");
            $table->unsignedBigInteger("nombre_chambres");
            $table->unsignedBigInteger("id_categorie");
            $table->foreign("id_categorie")->references("id")->on("categories");
            $table->unsignedBigInteger("id_client");
            $table->foreign("id_client")->references("id")->on("clients");
            $table->unsignedBigInteger("id_secteur");
            $table->foreign("id_secteur")->references("id")->on("secteurs");
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('annonces');
    }
};
