<?php

namespace App\Actions\Users;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class GetUsers
{
    public function handle(array $filters = []): LengthAwarePaginator
    {
        $users = User::query();
        $users->with('roles');

        if (!empty($filters['role'])) {
            $users->role($filters['role']);
        }

        $users->orderByDesc('created_at');

        return $users->paginate($filters['per_page'] ?? 20);
    }
}
