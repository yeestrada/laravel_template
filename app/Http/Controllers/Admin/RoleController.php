<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    /**
     * Display a listing of roles.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim();
        $perPageOptions = config('pagination.per_page_options', [10, 15, 25, 50, 100]);
        $perPage = (int) $request->input('per_page', config('pagination.per_page', 15));
        if (! in_array($perPage, $perPageOptions, true)) {
            $perPage = config('pagination.per_page', 15);
        }

        $query = Role::withCount('users')->orderBy('name');

        if ($search->isNotEmpty()) {
            $term = '%' . $search . '%';
            $query->where(function ($q) use ($term) {
                $q->where('name', 'like', $term)
                    ->orWhere('description', 'like', $term);
            });
        }

        $roles = $query->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
            'search' => $search->toString(),
            'per_page' => $perPage,
            'per_page_options' => $perPageOptions,
        ]);
    }

    /**
     * Store a newly created role.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name'],
            'slug' => ['required', 'string', 'max:255', 'alpha_dash', 'unique:roles,slug'],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        Role::create([
            'name' => $request->name,
            'slug' => Str::slug($request->slug),
            'description' => $request->filled('description') ? $request->description : null,
        ]);

        return redirect()->route('admin.roles.index')->with('status', 'role-created');
    }

    /**
     * Update the specified role.
     */
    public function update(Request $request, Role $role): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'alpha_dash', Rule::unique('roles', 'slug')->ignore($role->id)],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        $role->update([
            'name' => $request->name,
            'slug' => Str::slug($request->slug),
            'description' => $request->filled('description') ? $request->description : null,
        ]);

        return redirect()->route('admin.roles.index')->with('status', 'role-updated');
    }

    /**
     * Remove the specified role.
     */
    public function destroy(Role $role): RedirectResponse
    {
        if ($role->slug === 'admin') {
            return redirect()->route('admin.roles.index')->with('error', __('admin.roles.cannot_delete_admin'));
        }

        if ($role->users()->count() > 0) {
            return redirect()->route('admin.roles.index')->with('error', __('admin.roles.cannot_delete_has_users'));
        }

        $role->delete();

        return redirect()->route('admin.roles.index')->with('status', 'role-deleted');
    }

    /**
     * Get permissions for a role.
     */
    public function permissions(Role $role): JsonResponse
    {
        $role->load('permissions');
        $allPermissions = Permission::orderBy('name')->get();
        $assignedPermissionIds = $role->permissions->pluck('id')->toArray();
        
        $available = $allPermissions->reject(function ($permission) use ($assignedPermissionIds) {
            return in_array($permission->id, $assignedPermissionIds);
        })->values();
        
        $assigned = $role->permissions->sortBy('name')->values();

        return response()->json([
            'available' => $available,
            'assigned' => $assigned,
        ]);
    }

    /**
     * Update permissions for a role.
     * A role may have zero permissions; permission_ids can be an empty array.
     */
    public function updatePermissions(Request $request, Role $role): JsonResponse
    {
        $permissionIds = $request->input('permission_ids', []);
        if (! is_array($permissionIds)) {
            $permissionIds = [];
        }

        $request->validate([
            'permission_ids' => ['nullable', 'array'],
            'permission_ids.*' => ['exists:permissions,id'],
        ]);

        $role->permissions()->sync($permissionIds);

        return response()->json([
            'success' => true,
            'message' => __('admin.roles.permissions_updated'),
        ]);
    }
}
