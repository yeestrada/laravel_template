<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Creates/updates default admin users with password "admin".
     */
    public function run(): void
    {
        $adminRole = Role::where('slug', 'admin')->first();
        if (!$adminRole) {
            $this->command->error('Run RoleSeeder first (e.g. php artisan db:seed --class=RoleSeeder)');
            return;
        }

        $adminEmails = ['admin@example.com', 'admin@wec.net'];
        $adminPassword = Hash::make('admin');

        foreach ($adminEmails as $email) {
            User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => 'Admin',
                    'password' => $adminPassword,
                    'email_verified_at' => now(),
                    'role_id' => $adminRole->id,
                ]
            );
            $admin = User::where('email', $email)->first();
            if ($admin) {
                $admin->update([
                    'role_id' => $adminRole->id,
                    'password' => $adminPassword,
                ]);
            }
        }
    }
}
