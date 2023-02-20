<?php

namespace App\Http\Controllers;

use App\Models\User;
use \Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use mysql_xdevapi\Exception;
use Illuminate\Http\Response;

class UsersController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function list(): JsonResponse
    {
        $users = User::all(['id', 'name', 'phone', 'email']);

        return response()->json(compact('users'));
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function get(int $id): JsonResponse
    {
        $user = User::where('id', $id)->select(['name', 'phone', 'email'])->first();

        return response()->json(compact('user'));
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            User::where('id', $id)->delete();
        } catch (Exception $e) {
            return response('', Response::HTTP_BAD_REQUEST)->json(['error' => $e->getMessage()]);
        }

        return response()->json();
    }

    public function update(Request $request): JsonResponse
    {

        $user = User::find($request->id);

        if ($user === null) {
            return response('',
                Response::HTTP_NOT_FOUND
            )->json(['error' => "Пользователь с id {$request->id} не найден"]);
        }

        if ($user->update($request->all()) === false) {
            return response('',
                Response::HTTP_BAD_REQUEST
            )->json(['error' => "Не могу обновить пользователя с id {$request->id}"]);
        }

        return response()->json(['success']);
    }

}
