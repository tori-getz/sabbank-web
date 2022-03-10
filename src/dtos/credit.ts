
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
