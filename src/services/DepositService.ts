
import type { AxiosInstance } from "axios";
import type {
    IDepositListResult
} from '@dtos';

import { HTTPClient } from '@http';

export class DepositService {
    private http: AxiosInstance;

    public constructor () {
        this.http = HTTPClient;
    }

    public async getMyDeposits (): Promise<IDepositListResult> {
        const { data } = await this.http.get<IDepositListResult>('/depositList');

        return data;
    }
}
