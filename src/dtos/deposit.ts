
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

export interface IDepositSettingResult {
    id: string
    deposit_periods: IDepositPeriod
    currency: string
    asset: {
        ticker: string
        name: string
        enabled: boolean
    }
    deposit_limit: string
    description_ru: string
    description_en: string
    percentage: string
}

export interface IDepositCreateDto {
    deposit_settings: string
    amount: string
}

export interface IDepositCreateResult {
    detail: string
    id: string
}

export interface IDepositTopUpDto {
    deposit_id: string
    amount: string
}

export interface IDepositGetWithdrawInfoDto {
    id: string
}

export interface IDepositWithdrawDto {
    id: string
    amount: string
}
