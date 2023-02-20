<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{

    use HasFactory;
    public const STATUS_WAIT = 'wait';
    public const STATUS_PROCESS = 'process';
    public const STATUS_COMPLETE = 'complete';
    public const STATUS_CANCELED = 'canceled';
    public const STATUS_REFUND = 'refund';

    public const STATUS_LIST = [self::STATUS_WAIT,self::STATUS_CANCELED, self::STATUS_COMPLETE, self::STATUS_PROCESS, self::STATUS_REFUND];

    protected $fillable = [
        'user_id',
        'amount',
        'status'
    ];

    /**
     * @param int $user_id
     * @return void
     */
    public static function generatePayments(int $user_id): void
    {
        $data = [];
        $i = 1;
        while ($i < rand(3, 10)) {
            $i++;
            $status_key = array_rand(self::STATUS_LIST);
            $status = self::STATUS_LIST[$status_key];
            $amount =  rand(100, 1000);
            $created_at =  date('Y-m-d H:i:s');
            $updated_at =  date('Y-m-d H:i:s');
            $data[] = compact('user_id', 'status', 'amount', 'created_at', 'updated_at');
        }
        Payments::insert($data);
    }
}
