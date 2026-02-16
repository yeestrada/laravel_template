<?php

namespace Tests\Unit\Models;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_belongs_to_role(): void
    {
        $role = Role::factory()->create();
        $user = User::factory()->create(['role_id' => $role->id]);

        $this->assertInstanceOf(Role::class, $user->role);
        $this->assertEquals($role->id, $user->role->id);
    }

    public function test_user_is_admin_when_role_slug_is_admin(): void
    {
        $adminRole = Role::factory()->admin()->create();
        $user = User::factory()->create(['role_id' => $adminRole->id]);

        $this->assertTrue($user->isAdmin());
    }

    public function test_user_is_not_admin_when_role_slug_is_not_admin(): void
    {
        $userRole = Role::factory()->user()->create();
        $user = User::factory()->create(['role_id' => $userRole->id]);

        $this->assertFalse($user->isAdmin());
    }

    public function test_user_is_not_admin_when_no_role(): void
    {
        $user = User::factory()->create(['role_id' => null]);

        $this->assertFalse($user->isAdmin());
    }

    public function test_password_is_hashed_when_set(): void
    {
        $user = User::factory()->create([
            'password' => 'plain-password',
        ]);

        $this->assertNotEquals('plain-password', $user->password);
        $this->assertTrue(Hash::check('plain-password', $user->password));
    }

    public function test_password_is_hidden_in_serialization(): void
    {
        $user = User::factory()->create();
        $array = $user->toArray();

        $this->assertArrayNotHasKey('password', $array);
        $this->assertArrayNotHasKey('remember_token', $array);
    }
}
