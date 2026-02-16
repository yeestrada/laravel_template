<?php

namespace Tests\Unit\Models;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleTest extends TestCase
{
    use RefreshDatabase;

    public function test_role_has_many_users(): void
    {
        $role = Role::factory()->create();
        User::factory()->count(3)->create(['role_id' => $role->id]);

        $this->assertCount(3, $role->users);
        $this->assertInstanceOf(User::class, $role->users->first());
    }

    public function test_role_belongs_to_many_permissions(): void
    {
        $role = Role::factory()->create();
        $permission1 = Permission::factory()->create();
        $permission2 = Permission::factory()->create();

        $role->permissions()->attach([$permission1->id, $permission2->id]);

        $this->assertCount(2, $role->permissions);
        $this->assertTrue($role->permissions->contains($permission1));
        $this->assertTrue($role->permissions->contains($permission2));
    }

    public function test_role_is_admin_when_slug_is_admin(): void
    {
        $adminRole = Role::factory()->admin()->create();

        $this->assertTrue($adminRole->isAdmin());
    }

    public function test_role_is_not_admin_when_slug_is_not_admin(): void
    {
        $userRole = Role::factory()->user()->create();

        $this->assertFalse($userRole->isAdmin());
    }

    public function test_role_can_have_zero_permissions(): void
    {
        $role = Role::factory()->create();

        $this->assertCount(0, $role->permissions);
    }

    public function test_role_can_sync_permissions(): void
    {
        $role = Role::factory()->create();
        $permission1 = Permission::factory()->create();
        $permission2 = Permission::factory()->create();
        $permission3 = Permission::factory()->create();

        // Attach first two
        $role->permissions()->sync([$permission1->id, $permission2->id]);
        $this->assertCount(2, $role->fresh()->permissions);

        // Sync to different permissions
        $role->permissions()->sync([$permission2->id, $permission3->id]);
        $this->assertCount(2, $role->fresh()->permissions);
        $this->assertFalse($role->fresh()->permissions->contains($permission1));
        $this->assertTrue($role->fresh()->permissions->contains($permission2));
        $this->assertTrue($role->fresh()->permissions->contains($permission3));
    }
}
