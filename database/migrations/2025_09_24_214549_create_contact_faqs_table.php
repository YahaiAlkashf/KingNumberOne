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
        Schema::create('contact_faqs', function (Blueprint $table) {
            $table->id();
            $table->text('question_ar');
            $table->text('question_en')->nullable();
            $table->text('question_tr')->nullable();
            $table->text('answer_ar');
            $table->text('answer_en')->nullable();
            $table->text('answer_tr')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_faqs');
    }
};
