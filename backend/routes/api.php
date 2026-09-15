<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ActivityController;

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

    Route::post('/createUser', [UserController::class, 'create']);
    Route::put('/editUser/{id}', [UserController::class, 'edit']);
    Route::delete('/deleteUser/{id}', [UserController::class, 'delete']);

    Route::post('/createActivity', [ActivityController::class, 'create']);

});

