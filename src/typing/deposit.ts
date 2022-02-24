
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
