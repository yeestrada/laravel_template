<?php

namespace Tests\Feature\Api;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Role::factory()->user()->create();
    }

    public function test_user_can_register(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'user' => [
                'id',
                'name',
                'email',
                'email_verified_at',
                'role',
                'created_at',
                'updated_at',
            ],
            'token',
            'token_type',
        ]);
        
        // Verify sensitive fields are not exposed
        $response->assertJsonMissing(['password']);
        $response->assertJsonMissing(['remember_token']);
        $response->assertJsonMissing(['azure_id']);
        
        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }

    public function test_registration_validates_required_fields(): void
    {
        $response = $this->postJson('/api/register', []);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    public function test_registration_validates_email_uniqueness(): void
    {
        User::factory()->create(['email' => 'existing@example.com']);

        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'existing@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    public function test_registration_validates_password_confirmation(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'different',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
    }

    public function test_user_can_login(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertOk();
        $response->assertJsonStructure([
            'user' => [
                'id',
                'name',
                'email',
            ],
            'token',
            'token_type',
        ]);
        
        // Verify sensitive fields are not exposed
        $response->assertJsonMissing(['password']);
        $response->assertJsonMissing(['remember_token']);
    }

    public function test_login_fails_with_invalid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    public function test_login_revokes_previous_tokens(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        // Create initial token
        $firstToken = $user->createToken('auth')->plainTextToken;
        $this->assertCount(1, $user->tokens);

        // Login should revoke previous tokens
        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertOk();
        $this->assertCount(1, $user->fresh()->tokens);
        $this->assertNotEquals($firstToken, $response->json('token'));
    }

    public function test_authenticated_user_can_get_user_info(): void
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/user');

        $response->assertOk();
        $response->assertJsonStructure([
            'id',
            'name',
            'email',
            'email_verified_at',
            'role',
            'created_at',
            'updated_at',
        ]);
        
        // Verify sensitive fields are not exposed
        $response->assertJsonMissing(['password']);
        $response->assertJsonMissing(['remember_token']);
    }

    public function test_user_can_logout(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('auth')->plainTextToken;
        
        // Use the token for authentication
        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/logout');

        $response->assertOk();
        $response->assertJson(['message' => 'Successfully logged out']);
        
        // Verify the token was deleted
        $this->assertCount(0, $user->fresh()->tokens);
    }

    public function test_unauthenticated_user_cannot_access_protected_endpoints(): void
    {
        $response = $this->getJson('/api/user');
        $response->assertStatus(401);

        $response = $this->postJson('/api/logout');
        $response->assertStatus(401);
    }

    public function test_user_response_includes_role_when_available(): void
    {
        $role = Role::factory()->create(['name' => 'Editor', 'slug' => 'editor']);
        $user = User::factory()->create(['role_id' => $role->id]);
        Sanctum::actingAs($user);

        $response = $this->getJson('/api/user');

        $response->assertOk();
        $response->assertJson([
            'role' => [
                'id' => $role->id,
                'name' => 'Editor',
                'slug' => 'editor',
            ],
        ]);
    }
}
