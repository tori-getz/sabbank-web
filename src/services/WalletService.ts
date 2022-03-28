
import type { AxiosInstance } from 'axios';

import { HTTPClient } from '@http';

import type {
    IWalletFinddto
} from '@dtos';

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

    public async find (dto: IWalletFinddto): Promise<boolean> {
        const { data } = await this.http.post<{ detail: boolean }>('/wallets/check', dto);

        return data.detail;
    }
}
