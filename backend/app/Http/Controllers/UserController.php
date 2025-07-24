<?php

namespace App\Http\Controllers;

use App\Actions\Users\CreateUser;
use App\Actions\Users\GetUsers;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{

    public function index(Request $request, GetUsers $action): JsonResponse
    {
        $filters = [
            'role' => $request->role,
            'per_page' => $request->per_page ?? 20
        ];

        $users = $action->handle($filters);

        return $this->paginatedResponse($users, 'Users Retrieved Successfully', Response::HTTP_OK);
    }

    public function store(UserStoreRequest $request, CreateUser $action): JsonResponse
    {
        $user = $action->handle($request->validated());

        return $this->successResponse($user, 'User Created Successfully', Response::HTTP_CREATED);
    }
}
