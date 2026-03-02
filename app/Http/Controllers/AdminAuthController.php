<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{


    // 1. Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Logged in successfully',
            'token' => $token,
            'admin' => $admin
        ]);
    }



    // 2. Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logged out successfully'
        ]);
    }



    // 3. List all admins (SuperAdmin only)
    public function index(Request $request)
    {
        if ($request->user()->role !== 'superadmin') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 403);
        }

        $admins = Admin::all();
        return response()->json([
            'status' => 'success',
            'data' => $admins
        ]);
    }



    // 4. Show single admin (any admin can see)
    public function show($id)
    {
        $admin = Admin::find($id);
        if (!$admin) return response()->json([
            'status' => 'error',
            'message' => 'Admin not found'
        ], 404);

        return response()->json([
            'status' => 'success',
            'data' => $admin
        ]);
    }



    // 5. Create admin (SuperAdmin only)
    public function store(Request $request)
    {
        if ($request->user()->role !== 'superadmin') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 403);
        }

        $request->validate([
            'email' => 'required|email|unique:adminlogin,email',
            'password' => 'required|string|min:6',
        ]);

        $admin = Admin::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'admin',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Admin created',
            'data' => $admin
        ]);
    }



   
    // 7. Delete admin (SuperAdmin only)
    public function destroy(Request $request, $id)
    {
        if ($request->user()->role !== 'superadmin') {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 403);
        }

        $admin = Admin::find($id);
        if (!$admin) return response()->json([
            'status' => 'error',
            'message' => 'Admin not found'
        ], 404);

        $admin->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Admin deleted'
        ]);
    }
}
