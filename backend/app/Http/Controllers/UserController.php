<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    //
    private function ensureAdmin(): void
    {
        abort_unless(auth()->user()?->role === 'admin', 403);
    }

    public function index()
    {
        $this->ensureAdmin();

        return response()->json(
            User::all()
        );

    }

    public function search(Request $request)
    {
        $q = $request->query('q');

        return User::query()
            ->where('f_name', 'like', "%{$q}%")
            ->orWhere('l_name', 'like', "%{$q}%")
            ->orWhere('email', 'like', "%{$q}%")
            ->select('id', 'f_name', 'l_name', 'email')
            ->limit(10)
            ->get();
    }

    public function create(Request $request)
    {
        $this->ensureAdmin();

        $request->validate([
            'f_name' => 'required|string|max:255',
            'm_name' => 'nullable|string|max:255',
            'l_name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'department' => 'required|string|max:255',
            'branch' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed'
        ]);

        $user = User::create([
            'f_name' => $request->f_name,
            'm_name' => $request->m_name,
            'l_name' => $request->l_name,
            'phone' => $request->phone,
            'email' => $request->email,
            'department' => $request->department,
            'branch' => $request->branch,
            'password' => bcrypt($request->password)
        ]);

        return response()->json([$user, 'message' => 'User created successfully'], 201);
    }

    public function edit(Request $request, $id)
    {
        $this->ensureAdmin();

        $user = User::findOrFail($id);

        $request->validate([
            'f_name' => 'required|string|max:255',
            'm_name' => 'nullable|string|max:255',
            'l_name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'department' => 'required|string|max:255',
            'branch' => 'required|string|max:255',
            'password' => 'nullable|string|min:8|confirmed'
        ]);

        $user->update([
            'f_name' => $request->f_name,
            'm_name' => $request->m_name,
            'l_name' => $request->l_name,
            'phone' => $request->phone,
            'email' => $request->email,
            'department' => $request->department,
            'branch' => $request->branch,
            'password' => isset($request->password) ? bcrypt($request->password) : $user->password
        ]);

        return response()->json([$user, 'message' => 'User updated successfully']);
    }

    public function delete($id)
    {
        $this->ensureAdmin();

        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
