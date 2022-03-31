
export interface IWalletFinddto {
    address: string
    network: string
}

export interface IWalletWithdrawDto {
    wallet_id: number
    receiver_address: string
    amount: number
    asset: string
    otp: string
}
