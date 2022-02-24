
import type {
    IDepositGroup,
    IDepositPeriod,
    IDepositCurrency,
    IDepositHistoryItem
} from '@typing';

export interface IDepositListResult {
    total_income: number
    total_amount: number
    result: Array<IDepositGroup>
}

export interface IDepositHistoryDto {
    id: string
}

export interface IDepositHistoryResult {
    total_income: number
    id: string
    created_deposit: string
    on_hold: boolean
    data: {
        deposit_period: IDepositPeriod,
        currency: IDepositCurrency,
        history: Array<IDepositHistoryItem>
    }
}
