<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Task;
use App\Models\Activity;
use App\Models\Task_assignment;


class TaskController extends Controller
{
    //

    private function ensureHod(): void
    {
        abort_unless(auth()->user()?->title === 'hod', 403);
    }


    public function assignments(Request $request)
    {
        $this->ensureHod();

        $tasks = Task_assignment::with('task', 'assignee')
            ->where('assigned_by', $request->user()->id)
            ->orderBy('created_at')->get()->all();

        return response()->json(
            $tasks
        );

    }

    public function create(Request $request)
    {
        $validate = $request->validate([
            'activity_id' => 'required|exists:activities,id',
            'title' => 'required|string|max:100',
            'description' => 'nullable|string|max:255',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'assigned_to' => 'required|array|min:1',
            'assigned_to.*' => 'exists:users,id',

        ]);

        if ($validate) {
            DB::transaction(function () use ($request) {
                $task = Task::create([
                    'activity_id' => $request->activity_id,
                    'title' => $request->title,
                    'description' => $request->description,
                    'start_date' => $request->start_date,
                    'end_date' => $request->end_date,
                ]);

                foreach ($request->assigned_to as $userId) {
                    Task_assignment::create([
                        'task_id' => $task->id,
                        'assigned_to' => $userId,
                        'assigned_by' => $request->user()->id,
                        'status' => 'Assigned',
                    ]);
                }
            });
        }

    }

    public function assigned(Request $request)
    {
        $assignmets = Task_assignment::with('task')->with('assignor')->where('assigned_to', $request->user()->id)->orderBy('created_at')->get()->all();

        return response()->json(
            $assignmets

        );
    }

    private function recalculateActivityEfficiency(int $activityId): void
    {
        $activity = Activity::with('taskAssignments')->findOrFail($activityId);
        $assignments = $activity->taskAssignments;

        if (
            $assignments->isEmpty() ||
            $assignments->contains(fn ($assignment) => $assignment->status !== 'Completed')
        ) {
            $activity->update(['efficiency' => null]);
            return;
        }

        $ratedAssignments = $assignments->whereNotNull('rating');

        if ($ratedAssignments->isEmpty()) {
            $activity->update(['efficiency' => null]);
            return;
        }

        $efficiency = (
            $ratedAssignments->sum('rating') /
            ($ratedAssignments->count() * 5)
        ) * 100;

        $activity->update(['efficiency' => round($efficiency, 2)]);
    }

    public function mark(Request $request, int $assignment)
    {

        $validated = $request->validate([
            'status' => 'required|in:In progress,Completed',
        ]);

        $taskAssignment = Task_assignment::whereKey($assignment)
            ->where('assigned_to', $request->user()->id)
            ->firstOrFail();

        $taskAssignment->update([
            'status' => $validated['status'],
            'completed_at' => $validated['status'] === 'Completed'
                ? now()->toDateString()
                : null,
        ]);

        $this->recalculateActivityEfficiency($taskAssignment->task->activity_id);

        return response()->json($taskAssignment->load(['task', 'assignor']));

    }

    public function remarks(Request $request, int $assignment)
    {
        $this->ensureHod();

        $validated = $request->validate([
            'remarks' => 'required',
            'rating' => 'required|integer|between:1,5',
        ]);

        $taskAssignment = Task_assignment::
            where('id', $assignment)
            ->firstOrFail();

        $taskAssignment->update([
            'remarks' => $validated['remarks'],
            'rating' => $validated['rating'],
        ]);

        $this->recalculateActivityEfficiency($taskAssignment->task->activity_id);

        return response()->json([
            'message' => 'Rating submitted successfully.',
        ]);

    }




}
