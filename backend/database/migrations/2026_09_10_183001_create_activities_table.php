<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Laravel\Prompts\Progress;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description')->nullable();
            $table->foreignId('branch_id')->constrained('branches')->onDelete('cascade')->nullable();
            $table->foreignId('department_id')->constrained('departments')->onDelete('cascade')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->enum('priority', ['Low', 'Medium', 'High', 'Urgent'])->nullable();
            $table->enum('status', ['Planned', 'In progress', 'Completed', 'Cancelled', 'Incomplete', 'On hold'])->default('Planned');
            $table->string('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
