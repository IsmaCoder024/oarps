<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Department;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\User;
class AuthController extends Controller
{
    //

    public function register(Request $request)
    {

        $validate = $request->validate([
            'f_name' => 'required|string|max:255',
            'm_name' => 'nullable|string|max:255',
            'l_name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'department' => 'required|string|max:255',
            'branch' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed'
        ]);


        if ($validate) {
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

            return response()->json([
                'message' => 'Account created successfully',
            ], 200);
        } else {
            return response()->json([
                'error' => 'Invalid credential(s)',
            ], 401);
        }
        // $token = $user->createToken('auth_token')->plainTextToken;

        // return response()->json([
        //     'access_token' => $token,
        //     'token_type' => 'Bearer',
        // ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {

            $user = Auth::user();
            $request->session()->regenerate();

            return response()->json([
                'user' => $user,
                'message' => 'Login successful',
            ], 200);

        } else {
            return response()->json([
                'error' => 'Password or email incorrect'
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
