<?php

namespace Tests\Feature\Admin;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PermissionControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        $adminRole = Role::factory()->admin()->create();
        $this->admin = User::factory()->create(['role_id' => $adminRole->id]);
        $this->userRole = Role::factory()->user()->create();
    }

    public function test_admin_can_view_permissions_index(): void
    {
        Permission::factory()->count(5)->create();

        $response = $this->actingAs($this->admin)->get(route('admin.permissions.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Permissions/Index')
            ->has('permissions.data', 5)
        );
    }

    public function test_non_admin_cannot_view_permissions_index(): void
    {
        $regularUser = User::factory()->create(['role_id' => $this->userRole->id]);

        $response = $this->actingAs($regularUser)->get(route('admin.permissions.index'));

        $response->assertRedirect(route('dashboard'));
    }

    public function test_admin_can_search_permissions(): void
    {
        Permission::factory()->create(['name' => 'create posts', 'description' => 'Can create posts']);
        Permission::factory()->create(['name' => 'edit posts', 'description' => 'Can edit posts']);

        $response = $this->actingAs($this->admin)
            ->get(route('admin.permissions.index', ['search' => 'create']));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Permissions/Index')
            ->has('permissions.data', 1)
            ->where('permissions.data.0.name', 'create posts')
        );
    }

    public function test_admin_can_create_permission(): void
    {
        $response = $this->actingAs($this->admin)->post(route('admin.permissions.store'), [
            'name' => 'create users',
            'description' => 'Can create new users',
        ]);

        $response->assertRedirect(route('admin.permissions.index'));
        $this->assertDatabaseHas('permissions', [
            'name' => 'create users',
            'description' => 'Can create new users',
        ]);
    }

    public function test_permission_creation_validates_required_fields(): void
    {
        $response = $this->actingAs($this->admin)->post(route('admin.permissions.store'), []);

        $response->assertSessionHasErrors(['name']);
    }

    public function test_permission_creation_validates_unique_name(): void
    {
        Permission::factory()->create(['name' => 'existing permission']);

        $response = $this->actingAs($this->admin)->post(route('admin.permissions.store'), [
            'name' => 'existing permission',
            'description' => 'Some description',
        ]);

        $response->assertSessionHasErrors(['name']);
    }

    public function test_admin_can_create_permission_without_description(): void
    {
        $response = $this->actingAs($this->admin)->post(route('admin.permissions.store'), [
            'name' => 'view reports',
        ]);

        $response->assertRedirect(route('admin.permissions.index'));
        $this->assertDatabaseHas('permissions', [
            'name' => 'view reports',
            'description' => null,
        ]);
    }

    public function test_admin_can_update_permission(): void
    {
        $permission = Permission::factory()->create();

        $response = $this->actingAs($this->admin)->put(route('admin.permissions.update', $permission), [
            'name' => 'updated permission',
            'description' => 'Updated description',
        ]);

        $response->assertRedirect(route('admin.permissions.index'));
        $this->assertDatabaseHas('permissions', [
            'id' => $permission->id,
            'name' => 'updated permission',
            'description' => 'Updated description',
        ]);
    }

    public function test_admin_can_delete_permission(): void
    {
        $permission = Permission::factory()->create();

        $response = $this->actingAs($this->admin)->delete(route('admin.permissions.destroy', $permission));

        $response->assertRedirect(route('admin.permissions.index'));
        $this->assertDatabaseMissing('permissions', ['id' => $permission->id]);
    }

    public function test_admin_cannot_delete_permission_assigned_to_roles(): void
    {
        $permission = Permission::factory()->create();
        $role = Role::factory()->create();
        $role->permissions()->attach($permission->id);

        $response = $this->actingAs($this->admin)->delete(route('admin.permissions.destroy', $permission));

        $response->assertRedirect(route('admin.permissions.index'));
        $response->assertSessionHas('error');
        $this->assertDatabaseHas('permissions', ['id' => $permission->id]);
    }

    public function test_pagination_works_correctly(): void
    {
        Permission::factory()->count(25)->create();

        $response = $this->actingAs($this->admin)
            ->get(route('admin.permissions.index', ['per_page' => 10]));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Permissions/Index')
            ->has('permissions.data', 10)
            ->where('per_page', 10)
        );
    }
}
