
import type { AxiosInstance } from 'axios';

import { HTTPClient } from '@http';

import type {
    IWalletFinddto,
    IWalletWithdrawDto
} from '@dtos';

import type {
    IWalletTransaction,
    IWalletCurrency,
    IWalletWithdrawalSetting
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

    public async withdraw (dto: IWalletWithdrawDto) {
        const { data } = await this.http.post('/wallets/withdraw', dto);

        return data;
    }

    public async getWithdrawalSettings (): Promise<IWalletWithdrawalSetting[]> {
        const { data } = await this.http.get<IWalletWithdrawalSetting[]>('/withdrawalSettings');

        return data;
    }
}
