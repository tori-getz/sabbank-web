
export interface IWalletTotalBalance {
    [fiat: string]: number
}

export interface IWalletCurrency {
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

export interface IWalletRate {
    id: string
    name: string
    asset: string
    percentage_24h: {
        [fiat: string]: number
    }
    price: {
        [fiat: string]: number
    }
    chart_data: Array<number>
}

export type TransactionOperation = 'in' | 'out';
export type TransactionPaymentSystem = 'wallet' | 'deposit';
export type TransactionStatus = 'success' | 'pending' | 'updating' | 'rejected' | 'failed' | 'internal_error';

export interface IWalletTransaction {
    id: number
    date: string
    address_from: string | Array<string>
    address_to: string | Array<string>
    amount: string
    operation: TransactionOperation
    asset_name: string
    asset_ticker: string
    status: TransactionStatus
    payment_system: string
}
