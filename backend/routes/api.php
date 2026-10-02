<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\TaskController;

Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'Laravel API is working',
    ]);
});

Route::get('/test-cors-config', function () {
    return response()->json([
        'frontend_url' => config('cors.allowed_origins'),
    ]);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/departments', [DepartmentController::class, 'index']);
Route::get('/branches', [BranchController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/getUsers', [UserController::class, 'index']);

    Route::get('/users/search', [UserController::class, 'search']);

    Route::post('/createUser', [UserController::class, 'create']);
    Route::put('/editUser/{id}', [UserController::class, 'edit']);
    Route::delete('/deleteUser/{id}', [UserController::class, 'delete']);

    Route::get('/hods', [DepartmentController::class, 'hod']);
    Route::post('/createDepartment', [DepartmentController::class, 'create']);


    Route::post('/createActivity', [ActivityController::class, 'create']);
    Route::get('/assignedActivity', [ActivityController::class, 'viewAssigned']);
    
    Route::post('/activities/{activity}/tasks', [TaskController::class, 'create']);
    Route::get('/getAssignments', [TaskController::class, 'assignments']);
    Route::patch('/remarks/{assignment}', [TaskController::class, 'remarks']);
    
    Route::get('/assignedTask', [TaskController::class, 'assigned']);
    Route::patch('/assignedTask/{assignment}', [TaskController::class, 'mark']);
    

});

