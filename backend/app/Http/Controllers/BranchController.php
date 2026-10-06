<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Branch;
class BranchController extends Controller
{
    //
    public function index()
    {
        $branches = Branch::orderBy('name')->get()->all();
        
        return response()->json(
            $branches,

        );
    }

    public function create(Request $request){
        $validate = $request->validate([
            'name' => 'required|string|max:50',
            'location' => 'required|string|max:50',
            'description' => 'nullable|string|max:255',
        ]);


        if ($validate) {
            $department = Branch::create([
                'name' => $request->name,
                'location'=>$request->location,
                'description' => $request->description,

            ]);

            return response()->json([
                'message' => 'New branch created',
            ], 200);
        } else {
            return response()->json([
                'error' => 'Invalid records',
            ], 401);
        }
    }
}
