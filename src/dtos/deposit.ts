
import type {
    IDepositGroup
} from '@typing';

export interface IDepositListResult {
    total_income: number
    total_amount: number
    result: Array<IDepositGroup>
}
