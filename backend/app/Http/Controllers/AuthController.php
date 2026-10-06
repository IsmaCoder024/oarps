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
    }

    public function login(Request $request)
    {
         $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();
    
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 'Password or email incorrect'
            ], 401);
        }
    
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'user' => $user,
            'token' => $token,
            'message' => 'Login successful',
        ], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);

    }
}
