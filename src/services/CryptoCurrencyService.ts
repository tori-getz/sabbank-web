
import { HTTPClient } from '@http';

import type { AxiosInstance } from "axios";

import type { IWalletCurrency } from '@typing';

import type {
    ICryptoCurrencyGetExchangRateeDto,
    ICryptoCurrencyGetExchangRateResult
} from '@dtos';

import {
    formatToQueryParams
} from '@utils';

export class CryptoCurrencyService {
    private http: AxiosInstance;

    public constructor () {
        this.http = HTTPClient;
    }

    public async all (): Promise<IWalletCurrency[]> {
        const { data: { data } } = await this.http.get('/crypto/currencyList');

        return data;
    }

    public async aetExchangeRate (dto: ICryptoCurrencyGetExchangRateeDto): Promise<ICryptoCurrencyGetExchangRateResult> {
        const { data } = await this.http.get<ICryptoCurrencyGetExchangRateResult>(`/exchange?${formatToQueryParams<ICryptoCurrencyGetExchangRateeDto>(dto)}`);

        return data;
    }
}
