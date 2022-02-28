
export interface ICryptoCurrencyGetExchangRateeDto {
    asset_from: string
    asset_to: string
    amount: number
}

export interface ICryptoCurrencyGetExchangRateResult {
    asset_from: string
    asset_to: string
    amount: string
    rate: string
    result: string
};
