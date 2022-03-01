
import type { AxiosInstance } from 'axios';

import type {
    ICredit
} from '@typing';

import { HTTPClient } from '@http';

export class CreditService {
    private http: AxiosInstance;

    public constructor () {
        this.http = HTTPClient;
    }

    public async getCredits (): Promise<ICredit[]> {
        const { data } = await this.http.get<ICredit[]>('/loan/list');

        return data;
    }
}
