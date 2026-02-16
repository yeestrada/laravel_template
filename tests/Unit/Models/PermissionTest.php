<?php

namespace Tests\Unit\Models;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PermissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_permission_belongs_to_many_roles(): void
    {
        $permission = Permission::factory()->create();
        $role1 = Role::factory()->create();
        $role2 = Role::factory()->create();

        $permission->roles()->attach([$role1->id, $role2->id]);

        $this->assertCount(2, $permission->roles);
        $this->assertTrue($permission->roles->contains($role1));
        $this->assertTrue($permission->roles->contains($role2));
    }

    public function test_permission_can_have_zero_roles(): void
    {
        $permission = Permission::factory()->create();

        $this->assertCount(0, $permission->roles);
    }

    public function test_permission_can_be_created_without_description(): void
    {
        $permission = Permission::factory()->create([
            'name' => 'test permission',
            'description' => null,
        ]);

        $this->assertNull($permission->description);
        $this->assertEquals('test permission', $permission->name);
    }

    public function test_permission_can_be_created_with_description(): void
    {
        $permission = Permission::factory()->create([
            'name' => 'test permission',
            'description' => 'Test description',
        ]);

        $this->assertEquals('Test description', $permission->description);
    }
}
