
import { HTTPClient } from '@http';
import type { AxiosInstance } from "axios";

import type { iCurrency } from '@typing';

export class CryptoCurrencyService {
    private http: AxiosInstance;

    public constructor () {
        this.http = HTTPClient;
    }

    public async all (): Promise<iCurrency[]> {
        const { data: { data } } = await this.http.get('/crypto/currencyList');

        return data;
    }
}
