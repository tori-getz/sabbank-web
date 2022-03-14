
import type { AxiosInstance } from 'axios';

import type {
    ICredit,
    ICreditSetting,
    ICreditRepaymentSchedule,
    ICreditPaymentInfo
} from '@typing';

import type {
    ICreditGetDto,
    ICreditPrepareDto,
    ICreditCreateDto,
    ICreditIncreaseCollateralDto,
    ICreditGetRepaymentScheduleDto,
    ICreditGetCloseInfoDto,
    ICreditGetPaymentInfoDto,
    ICreditCloseDto,
    ICreditPayDto
} from '@dtos';

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

    public async getCredit (dto: ICreditGetDto): Promise<ICredit> {
        const { data } = await this.http.get<ICredit>(`/loan/${dto.id}`);

        return data;
    }

    public async getSettings (): Promise<ICreditSetting[]> {
        const { data } = await this.http.get<ICreditSetting[]>('/loan/settings');

        return data;
    }

    public async prepare (dto: ICreditPrepareDto): Promise<ICredit> {
        const { data } = await this.http.post<ICredit>('/loan/prepare', dto);

        return data;
    }

    public async create (dto: ICreditCreateDto): Promise<ICredit> {
        const { data } = await this.http.post<ICredit>('/loan/create', dto);

        return data;
    }

    public async increaseCollateral ({ id, ...dto }: ICreditIncreaseCollateralDto): Promise<ICredit> {
        const { data } = await this.http.post<ICredit>(`/loan/${id}/replenish`, dto);

        return data;
    }

    public async getRepaymentSchedule ({ id }: ICreditGetRepaymentScheduleDto): Promise<ICreditRepaymentSchedule[]> {
        const { data } = await this.http.get<ICreditRepaymentSchedule[]>(`/loan/${id}/payment`);

        return data;
    }

    public async getCloseInfo (dto: ICreditGetCloseInfoDto): Promise<ICreditPaymentInfo> {
        const { data } = await this.http.get<ICreditPaymentInfo>(`/loan/${dto.id}/close`);

        return data;
    }

    public async getPaymentInfo ({ id, payment_id }: ICreditGetPaymentInfoDto): Promise<ICreditPaymentInfo> {
        const { data } = await this.http.get<ICreditPaymentInfo>(`/loan/${id}/payment/${payment_id}`);

        return data;
    }

    public async close ({ id, method }: ICreditCloseDto): Promise<ICredit> {
        const { data } = await this.http.post<ICredit>(`/loan/${id}/close`, { method });

        return data;
    }

    public async pay ({ id, payment_id, method }: ICreditPayDto): Promise<ICredit> {
        const { data } = await this.http.post<ICredit>(`/loan/${id}/payment/${payment_id}`, { method });

        return data;
    }
}
