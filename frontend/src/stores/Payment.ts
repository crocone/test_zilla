export const STATUS_WAIT = 'wait';
export const STATUS_PROCESS = 'process';
export const STATUS_COMPLETE = 'complete';
export const STATUS_CANCELED = 'canceled';
export const STATUS_REFUND = 'refund';

export const STATUS_LIST = [STATUS_WAIT, STATUS_CANCELED, STATUS_COMPLETE, STATUS_PROCESS, STATUS_REFUND];
export const STATUS_TEXT: Record<string, string> = {
        [STATUS_WAIT]: 'Ожидание',
        [STATUS_CANCELED]: 'Отменен',
        [STATUS_COMPLETE]: 'Выполнен',
        [STATUS_PROCESS]: 'Процессинг',
        [STATUS_REFUND]: 'Возврат'
    }

export interface Payment {
    id: number
    user_id: number
    amount: string

    status: string
    created_at: string
}
