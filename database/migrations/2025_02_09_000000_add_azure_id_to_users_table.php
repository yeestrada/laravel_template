<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Allows Sign in with Microsoft (Azure Entra ID); password nullable for OAuth-only users.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('azure_id', 255)->nullable()->unique()->after('id');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->string('password')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('azure_id');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->string('password')->nullable(false)->change();
        });
    }
};
