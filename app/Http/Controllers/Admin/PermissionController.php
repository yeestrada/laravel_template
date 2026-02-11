<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PermissionController extends Controller
{
    /**
     * Display a listing of permissions.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim();
        $perPageOptions = config('pagination.per_page_options', [10, 15, 25, 50, 100]);
        $perPage = (int) $request->input('per_page', config('pagination.per_page', 15));
        if (! in_array($perPage, $perPageOptions, true)) {
            $perPage = config('pagination.per_page', 15);
        }

        $query = Permission::withCount('roles')->orderBy('name');

        if ($search->isNotEmpty()) {
            $term = '%' . $search . '%';
            $query->where(function ($q) use ($term) {
                $q->where('name', 'like', $term)
                    ->orWhere('description', 'like', $term);
            });
        }

        $permissions = $query->paginate($perPage)->withQueryString();

        return Inertia::render('Admin/Permissions/Index', [
            'permissions' => $permissions,
            'search' => $search->toString(),
            'per_page' => $perPage,
            'per_page_options' => $perPageOptions,
        ]);
    }

    /**
     * Store a newly created permission.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:permissions,name'],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        Permission::create([
            'name' => $request->name,
            'description' => $request->filled('description') ? $request->description : null,
        ]);

        return redirect()->route('admin.permissions.index')->with('status', 'permission-created');
    }

    /**
     * Update the specified permission.
     */
    public function update(Request $request, Permission $permission): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('permissions', 'name')->ignore($permission->id)],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        $permission->update([
            'name' => $request->name,
            'description' => $request->filled('description') ? $request->description : null,
        ]);

        return redirect()->route('admin.permissions.index')->with('status', 'permission-updated');
    }

    /**
     * Remove the specified permission.
     */
    public function destroy(Permission $permission): RedirectResponse
    {
        if ($permission->roles()->count() > 0) {
            return redirect()->route('admin.permissions.index')->with('error', __('admin.permissions.cannot_delete_has_roles'));
        }

        $permission->delete();

        return redirect()->route('admin.permissions.index')->with('status', 'permission-deleted');
    }
}
