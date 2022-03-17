
import type { AxiosInstance } from 'axios';

import { HTTPClient } from '@http';

import type {
    IWalletTransaction
} from '@typing';

export class WalletService {
    private http: AxiosInstance;

    public constructor () {
        this.http = HTTPClient;
    }

    public async getTransactions (): Promise<IWalletTransaction[]> {
        const { data } = await this.http.get<IWalletTransaction[]>('/wallets/transactions');

        return data;
    }
}
