

import type {
    CreditPaymentMethod
} from '@typing';

export interface ICreditGetDto {
    id: string
}

export interface ICreditPrepareDto {
    deposit: string
    settings: string
    comission_currency: string
}

export interface ICreditCreateDto extends ICreditPrepareDto {}

export interface ICreditIncreaseCollateralDto {
    id: string
    amount: number
}

export interface ICreditGetRepaymentScheduleDto {
    id: string
}

export interface ICreditGetCloseInfoDto {
    id: string
}

export interface ICreditGetPaymentInfoDto {
    id: string
    payment_id: string
}

export interface ICreditCloseDto {
    id: string
    method: CreditPaymentMethod
}

export interface ICreditPayDto {
    id: string
    payment_id: string
    method: CreditPaymentMethod
}
