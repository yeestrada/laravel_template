<?php

namespace Tests\Feature\Admin;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        $adminRole = Role::factory()->admin()->create();
        $this->admin = User::factory()->create(['role_id' => $adminRole->id]);
        $this->userRole = Role::factory()->user()->create();
    }

    public function test_admin_can_view_roles_index(): void
    {
        Role::factory()->count(3)->create();

        $response = $this->actingAs($this->admin)->get(route('admin.roles.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Roles/Index')
            ->has('roles.data', 5) // 3 created + admin + user roles
        );
    }

    public function test_non_admin_cannot_view_roles_index(): void
    {
        $regularUser = User::factory()->create(['role_id' => $this->userRole->id]);

        $response = $this->actingAs($regularUser)->get(route('admin.roles.index'));

        $response->assertRedirect(route('dashboard'));
    }

    public function test_admin_can_search_roles(): void
    {
        Role::factory()->create(['name' => 'Manager', 'description' => 'Manages team']);
        Role::factory()->create(['name' => 'Editor', 'description' => 'Edits content']);

        $response = $this->actingAs($this->admin)
            ->get(route('admin.roles.index', ['search' => 'Manager']));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Roles/Index')
            ->has('roles.data', 1)
            ->where('roles.data.0.name', 'Manager')
        );
    }

    public function test_admin_can_create_role(): void
    {
        $response = $this->actingAs($this->admin)->post(route('admin.roles.store'), [
            'name' => 'Manager',
            'slug' => 'manager',
            'description' => 'Manages the team',
        ]);

        $response->assertRedirect(route('admin.roles.index'));
        $this->assertDatabaseHas('roles', [
            'name' => 'Manager',
            'slug' => 'manager',
            'description' => 'Manages the team',
        ]);
    }

    public function test_role_creation_validates_required_fields(): void
    {
        $response = $this->actingAs($this->admin)->post(route('admin.roles.store'), []);

        $response->assertSessionHasErrors(['name', 'slug']);
    }

    public function test_role_creation_validates_unique_name(): void
    {
        Role::factory()->create(['name' => 'Existing Role']);

        $response = $this->actingAs($this->admin)->post(route('admin.roles.store'), [
            'name' => 'Existing Role',
            'slug' => 'different-slug',
        ]);

        $response->assertSessionHasErrors(['name']);
    }

    public function test_role_creation_validates_unique_slug(): void
    {
        Role::factory()->create(['slug' => 'existing-slug']);

        $response = $this->actingAs($this->admin)->post(route('admin.roles.store'), [
            'name' => 'Different Name',
            'slug' => 'existing-slug',
        ]);

        $response->assertSessionHasErrors(['slug']);
    }

    public function test_admin_can_update_role(): void
    {
        $role = Role::factory()->create();

        $response = $this->actingAs($this->admin)->put(route('admin.roles.update', $role), [
            'name' => 'Updated Role',
            'slug' => 'updated-role',
            'description' => 'Updated description',
        ]);

        $response->assertRedirect(route('admin.roles.index'));
        $this->assertDatabaseHas('roles', [
            'id' => $role->id,
            'name' => 'Updated Role',
            'slug' => 'updated-role',
            'description' => 'Updated description',
        ]);
    }

    public function test_admin_can_delete_role(): void
    {
        $role = Role::factory()->create();

        $response = $this->actingAs($this->admin)->delete(route('admin.roles.destroy', $role));

        $response->assertRedirect(route('admin.roles.index'));
        $this->assertDatabaseMissing('roles', ['id' => $role->id]);
    }

    public function test_admin_cannot_delete_admin_role(): void
    {
        $adminRole = Role::where('slug', 'admin')->first();

        $response = $this->actingAs($this->admin)->delete(route('admin.roles.destroy', $adminRole));

        $response->assertRedirect(route('admin.roles.index'));
        $response->assertSessionHas('error');
        $this->assertDatabaseHas('roles', ['id' => $adminRole->id]);
    }

    public function test_admin_cannot_delete_role_with_users(): void
    {
        $role = Role::factory()->create();
        User::factory()->create(['role_id' => $role->id]);

        $response = $this->actingAs($this->admin)->delete(route('admin.roles.destroy', $role));

        $response->assertRedirect(route('admin.roles.index'));
        $response->assertSessionHas('error');
        $this->assertDatabaseHas('roles', ['id' => $role->id]);
    }

    public function test_admin_can_get_role_permissions(): void
    {
        $role = Role::factory()->create();
        $permission1 = Permission::factory()->create();
        $permission2 = Permission::factory()->create();
        $role->permissions()->attach([$permission1->id]);

        $response = $this->actingAs($this->admin)
            ->getJson(route('admin.roles.permissions', $role));

        $response->assertOk();
        $response->assertJsonStructure([
            'available',
            'assigned',
        ]);
        $response->assertJsonCount(1, 'assigned');
        $response->assertJsonCount(1, 'available');
    }

    public function test_admin_can_update_role_permissions(): void
    {
        $role = Role::factory()->create();
        $permission1 = Permission::factory()->create();
        $permission2 = Permission::factory()->create();
        $permission3 = Permission::factory()->create();

        $response = $this->actingAs($this->admin)
            ->putJson(route('admin.roles.permissions.update', $role), [
                'permission_ids' => [$permission1->id, $permission2->id],
            ]);

        $response->assertOk();
        $response->assertJson(['success' => true]);
        $this->assertCount(2, $role->fresh()->permissions);
        $this->assertTrue($role->fresh()->permissions->contains($permission1));
        $this->assertTrue($role->fresh()->permissions->contains($permission2));
    }

    public function test_admin_can_remove_all_permissions_from_role(): void
    {
        $role = Role::factory()->create();
        $permission = Permission::factory()->create();
        $role->permissions()->attach($permission->id);

        $response = $this->actingAs($this->admin)
            ->putJson(route('admin.roles.permissions.update', $role), [
                'permission_ids' => [],
            ]);

        $response->assertOk();
        $this->assertCount(0, $role->fresh()->permissions);
    }

    public function test_permission_update_validates_permission_ids_exist(): void
    {
        $role = Role::factory()->create();

        $response = $this->actingAs($this->admin)
            ->putJson(route('admin.roles.permissions.update', $role), [
                'permission_ids' => [99999],
            ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['permission_ids.0']);
    }
}
