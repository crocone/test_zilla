<?php

namespace App\Http\Controllers;

use App\Models\Payments;
use Illuminate\Http\JsonResponse;

class PaymentsController extends Controller
{
    /**
     * @param $user_id
     * @return JsonResponse
     */
    public function list($user_id): JsonResponse
    {
        $payments = Payments::where('user_id', $user_id)->select(['id', 'amount', 'created_at', 'status'])->get();

        return response()->json(compact('payments'));
    }
}
