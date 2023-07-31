<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('surveys', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignIdFor(\App\Models\User::class, 'user_id');
            $table->string('image', 255)->nullable();
            $table->string('title', 1000);
            $table->string('slug', 1000);
            $table->tinyInteger('status');
            $table->text('description')->nullable();
            $table->timestamps();
            $table->timestamp('expire_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('surveys');
    }
};
