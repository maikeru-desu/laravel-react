<?php

namespace App\Actions\Users;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CreateUser
{
    public function handle(array $attributes): User
    {
        return DB::transaction(function () use ($attributes) {
            $user = User::create([
                'email' => $attributes['email'],
                'name' => $attributes['full_name'],
                'password' => Hash::make('password')
            ]);

            $user->assignRole($attributes['roles']);

            $user->load('roles');

            return $user;
        });
    }
}
