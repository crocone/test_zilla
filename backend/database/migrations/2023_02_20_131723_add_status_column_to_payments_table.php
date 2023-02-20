<?php

use Illuminate\Database\Migrations\Migration;
use \App\Models\Payments;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('payments', function ($table) {
            $table->enum('status', [Payments::STATUS_LIST]);
        });
    }

    public function down(): void
    {
        Schema::table('payments', function ($table) {
            $table->dropColumn('status');
        });
    }
};
