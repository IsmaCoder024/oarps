<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    //
    public function index()
    {
        $departments =Department::orderBy('name')->get()->all();
        
        return response()->json(
            $departments,

        );
    }

    public function hod()
    {
        $hods =User::where('title', 'hod')->orderBy('f_name')->get()->all();
        
        return response()->json(
            $hods,

        );
    }

    public function create(Request $request){
        $validate = $request->validate([
            'name' => 'required|string|max:50',
            'hod_id' => 'nullable|exists:users,id',
            'branch_id' => 'nullable|exists:branches,id',
            'description' => 'nullable|string|max:255',
        ]);


        if ($validate) {
            $department = Department::create([
                'name' => $request->name,
                'hod_id' => $request->hod_id,
                'branch_id' => $request->branch_id,
                'description' => $request->description,

            ]);

            return response()->json([
                'message' => 'Department created',
            ], 200);
        } else {
            return response()->json([
                'error' => 'Invalid records',
            ], 401);
        }
    }

}
