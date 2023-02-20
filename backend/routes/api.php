<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\UsersController;
use \App\Http\Controllers\PaymentsController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->get('users', [UsersController::class, 'list'])
    ->name('users');

Route::middleware(['auth:sanctum'])->get('users/{id}', [UsersController::class, 'get'])
    ->name('get_user');

Route::middleware(['auth:sanctum'])->post('users', [UsersController::class, 'update'])
    ->name('update_users');

Route::middleware(['auth:sanctum'])->delete('users/{id}', [UsersController::class, 'destroy'])
    ->name('destroy_users');

Route::middleware(['auth:sanctum'])->get('users/{user_id}/payments', [PaymentsController::class, 'list'])
    ->name('user_payments');
