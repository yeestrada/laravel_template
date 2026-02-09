<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * List users (example protected API endpoint).
     */
    public function index(Request $request)
    {
        $perPage = $request->integer('per_page', 15);
        $users = User::query()->paginate($perPage);

        return UserResource::collection($users);
    }

    /**
     * Show a user.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }
}
