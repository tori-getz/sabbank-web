
export interface IDeposit {
    id: string
    is_active: boolean
    asset: string
    name: string
    amount: string
}

export interface IDepositGroup {
    name_en: string
    name_ru: string
    percentage: number
    data: Array<IDeposit>
}

export interface IDepositPeriod {
    id: string
    period: any
    name_ru: string
    name_en: string
    description_ru?: string
    description_en?: string
    settingsId?: string
    deposit_limit?: string
}

export interface IDepositHistoryItem {
    amount: string
    created: string
    history_type: string
    title: string
    asset: string
}

export interface IDepositCurrency {
    id: string
    asset: string
    name: string
    amount: string
    percentage: number
}

export interface IDepositSettingCurrencyPeriod {
    depositPeriod: IDepositPeriod
    percentage: string
}

export interface IDepositSettingCurrency {
    asset: string
    id: string
    name: string
    data: Array<IDepositSettingCurrencyPeriod>
}

export interface IDepositSettings {
    currencies: Array<IDepositSettingCurrency>,
    depositPeriods: Array<IDepositPeriod>
}

export interface IDepositAgreementContent {
    id: number
    key: string
    category: string
    ts: string
    title_en: string
    title_ru: string
    body_en: string
    body_ru: string
}

export interface IDepositWithdrawInfo {
    id: string
    asset: {
        ticker: string
        name: string
        enabled: boolean
    }
    amount: string
    profit: string
}
