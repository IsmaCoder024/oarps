<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    //
    private function ensureManager(): void
    {
        abort_unless(auth()->user()?->title === 'manager' || auth()->user()?->title === 'head_manager', 403);
    }

    public function index()
    {
        $this->ensureManager();
        $activities = Activity::all();
        return response()->json($activities);
    }

    public function create(Request $request)
    {
        $this->ensureManager();

        $validate = $request->validate([
            'title' => 'required|string|max:50',
            'description' => 'nullable|string|max:255',
            'branch_id' => 'nullable|exists:branches,id',
            'department_id' => 'nullable|exists:departments,id',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'priority' => 'required|string|max:50',
            'remarks' => 'nullable|string|max:255',
        ]);


        if ($validate) {
            $activity = Activity::create([
                'title' => $request->title,
                'description' => $request->description,
                'branch_id' => $request->branch_id,
                'department_id' => $request->branch_id,
                'created_by' => $request->user()->id,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'priority' => $request->priority,
                'status' => $request->status,
                'remarks' => $request->remarks,

            ]);

            return response()->json([
                'message' => 'Activity successfully initiated',
            ], 200);
        } else {
            return response()->json([
                'error' => 'Invalid records',
            ], 401);
        }
    }
}
