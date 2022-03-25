
import type { AxiosInstance } from 'axios';

import { HTTPClient } from '@http';

import type {
    IWalletTransaction,
    IWalletCurrency
} from '@typing';

export class WalletService {
    private http: AxiosInstance;

    public constructor () {
        this.http = HTTPClient;
    }

    public async createWallets (): Promise<IWalletCurrency[]> {
        const { data: { data } } = await this.http.post('/wallets');

        return data;
    }

    public async getTransactions (): Promise<IWalletTransaction[]> {
        const { data } = await this.http.get<IWalletTransaction[]>('/wallets/transactions');

        return data;
    }
}
