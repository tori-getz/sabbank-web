
export interface ITotalBalance {
    [fiat: string]: number
}

export interface ICurrency {
    id: string
    name: string
    asset: string
    enabled: boolean
    network: string
    price: {
        [fiat: string]: number
    }
    percentage_24h: {
        [fiat: string]: number
    }
    chart_data: Array<number>
    balance: number
    address: string
    fee: string
    wallet_id: number
}
