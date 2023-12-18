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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('provider_id');
            $table->foreign('customer_id')->references('id')->on('users');
            $table->foreign('service_id')->references('id')->on('services');
            $table->foreign('provider_id')->references('id')->on('users');

            $table->date('date');
            $table->boolean('emergency');
            $table->string('delay')->nullable();
            $table->string('location');
            $table->json('scopes');
            $table->string('service')->nullable();
            $table->string('size')->nullable();

            $table->string('response')->nullable();

            $table->string('name', 40);
            $table->string('email');
            $table->string('number', 12);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
