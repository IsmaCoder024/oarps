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
