<?php

namespace Tests\Feature\Admin;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create admin role and user
        $adminRole = Role::factory()->admin()->create();
        $this->admin = User::factory()->create(['role_id' => $adminRole->id]);
        
        // Create regular user role
        $userRole = Role::factory()->user()->create();
        $this->userRole = $userRole;
    }

    public function test_admin_can_view_users_index(): void
    {
        User::factory()->count(5)->create(['role_id' => $this->userRole->id]);

        $response = $this->actingAs($this->admin)->get(route('admin.users.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Users/Index')
            ->has('users.data', 6) // 5 created + 1 admin
        );
    }

    public function test_non_admin_cannot_view_users_index(): void
    {
        $regularUser = User::factory()->create(['role_id' => $this->userRole->id]);

        $response = $this->actingAs($regularUser)->get(route('admin.users.index'));

        $response->assertRedirect(route('dashboard'));
    }

    public function test_admin_can_search_users(): void
    {
        User::factory()->create(['name' => 'John Doe', 'email' => 'john@example.com', 'role_id' => $this->userRole->id]);
        User::factory()->create(['name' => 'Jane Smith', 'email' => 'jane@example.com', 'role_id' => $this->userRole->id]);

        $response = $this->actingAs($this->admin)
            ->get(route('admin.users.index', ['search' => 'John']));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Users/Index')
            ->has('users.data', 1)
            ->where('users.data.0.name', 'John Doe')
        );
    }

    public function test_admin_can_create_user(): void
    {
        $response = $this->actingAs($this->admin)->post(route('admin.users.store'), [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role_id' => $this->userRole->id,
        ]);

        $response->assertRedirect(route('admin.users.index'));
        $this->assertDatabaseHas('users', [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'role_id' => $this->userRole->id,
        ]);
    }

    public function test_admin_can_create_user_without_role_id_uses_default_user_role(): void
    {
        $response = $this->actingAs($this->admin)->post(route('admin.users.store'), [
            'name' => 'Default User',
            'email' => 'default@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertRedirect(route('admin.users.index'));
        $this->assertDatabaseHas('users', [
            'name' => 'Default User',
            'email' => 'default@example.com',
            'role_id' => $this->userRole->id,
        ]);
    }

    public function test_user_creation_validates_required_fields(): void
    {
        $response = $this->actingAs($this->admin)->post(route('admin.users.store'), []);

        $response->assertSessionHasErrors(['name', 'email', 'password']);
    }

    public function test_user_creation_validates_email_uniqueness(): void
    {
        $existingUser = User::factory()->create(['email' => 'existing@example.com', 'role_id' => $this->userRole->id]);

        $response = $this->actingAs($this->admin)->post(route('admin.users.store'), [
            'name' => 'New User',
            'email' => 'existing@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertSessionHasErrors(['email']);
    }

    public function test_admin_can_update_user(): void
    {
        $user = User::factory()->create(['role_id' => $this->userRole->id]);

        $response = $this->actingAs($this->admin)->put(route('admin.users.update', $user), [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'role_id' => $this->userRole->id,
        ]);

        $response->assertRedirect(route('admin.users.index'));
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ]);
    }

    public function test_admin_can_delete_user(): void
    {
        $user = User::factory()->create(['role_id' => $this->userRole->id]);

        $response = $this->actingAs($this->admin)->delete(route('admin.users.destroy', $user));

        $response->assertRedirect(route('admin.users.index'));
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_admin_cannot_delete_self(): void
    {
        $response = $this->actingAs($this->admin)->delete(route('admin.users.destroy', $this->admin));

        $response->assertRedirect(route('admin.users.index'));
        $response->assertSessionHas('error');
        $this->assertDatabaseHas('users', ['id' => $this->admin->id]);
    }

    public function test_pagination_works_correctly(): void
    {
        User::factory()->count(20)->create(['role_id' => $this->userRole->id]);

        $response = $this->actingAs($this->admin)
            ->get(route('admin.users.index', ['per_page' => 10]));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Users/Index')
            ->has('users.data', 10)
            ->where('per_page', 10)
        );
    }
}
