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
        Schema::create('visits', function (Blueprint $table) {
            $table->id();
            $table->date("date");
            $table->string("status");
            $table->unsignedBigInteger("id_client");
            $table->unsignedBigInteger("id_annonce");
            $table->foreign("id_client")->references("id")->on("clients");
            $table->foreign("id_annonce")->references("id")->on("annonces");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
