
export type CreditStatus = 'active' | 'finished' | 'closed' | 'liquidated';

export type CreditLtvStatus = 'ok' | 'closed' | 'warning';

export type CreditRepaymentType = 'scheduled' | 'full';

export interface ICreditActivePayment {
    id: string
    status: number
    status_verbose: string
    amount: string
    type: number
    type_verbose: string
    paid_amount: any
    paid_currency: string
    paid_ts: string | null
    due_ts: string
    loan: string
}

export interface ICredit {
    id: string
    number: string
    status: CreditStatus
    ltv_original: string
    ltv: number
    ltv_status: CreditLtvStatus
    limit: number
    limit_warning: number
    rate: number
    month_rate: string
    amount: string
    deposit: string
    deposit_currency: string
    comission: string
    comission_amount: string
    comission_currency: string
    close_price: number
    finish_payment: string
    next_payment: string
    is_active: boolean
    update_ts: string
    created_ts: string
    active_payment?: ICreditActivePayment
}

export interface ICreditSetting {
    id: string
    ltv: number
    rate: number
    currency: string
    comission: string
    close_date: string
    amount_limit: number
    limit: number
    limit_warning: number
}

export interface ICreditRepaymentSchedule {
    amount: string
    due_ts: string
    id: string
    loan: string
    paid_amount: string
    paid_currency: string
    paid_ts: string
    status: number
    status_verbose: string
    type: number
    type_verbose: string
}
