
import type { AxiosInstance } from "axios";
import type {
    IDepositListResult,
    IDepositHistoryResult,
    IDepositHistoryDto,
    IDepositSettingResult,
    IDepositCreateDto,
    IDepositCreateResult,
    IDepositTopUpDto
} from '@dtos';

import type {
    IDepositSettings
} from '@typing';

import { HTTPClient } from '@http';

export class DepositService {
    private http: AxiosInstance;

    public constructor () {
        this.http = HTTPClient;
    }

    public async getInfo (): Promise<IDepositSettings> {
        const { data } = await this.http.get<IDepositSettingResult[]>('/deposit/settings');

        let currencies = [];
        let depositPeriods = [];
        let depositPeriodIdsSet = new Set([]);
        let currencyIdsSet = new Set([]);

        // Get unique deposit periods ids and unique currency assets
        data.map(item => {
            depositPeriodIdsSet.add(item.deposit_periods.id);
            currencyIdsSet.add(item.asset.ticker);
        });

        depositPeriodIdsSet.forEach(periodId => {
            const periodObject = data.find(item => item.deposit_periods.id === periodId);

            depositPeriods.push({
                id: periodObject.deposit_periods.id,
                period: periodObject.deposit_periods.period,
                name_ru: periodObject.deposit_periods.name_ru,
                name_en: periodObject.deposit_periods.name_en,
                description_ru: periodObject.description_ru,
                description_en: periodObject.description_en,
                deposit_limit: periodObject.deposit_limit
            });
        });

        currencyIdsSet.forEach(currencyAsset => {
            const currencyObject = data.find(item => item.currency === currencyAsset);

            currencies.push({
                id: currencyObject.id,
                asset: currencyObject.asset.ticker,
                name: currencyObject.asset.name,
                data: [],
            });
        });

        currencies.map(currency => {
            const dataArr = data.filter(item => item.currency === currency.asset);

            dataArr.map(x => {
                currency.data.push({
                    percentage: x.percentage,
                    depositPeriod: {
                        id: x.deposit_periods.id,
                        period: x.deposit_periods.period,
                        name_ru: x.deposit_periods.name_ru,
                        name_en: x.deposit_periods.name_en,
                        description_ru: x.description_ru,
                        description_en: x.description_en,
                        settingsId: x.id,
                        deposit_limit: x.deposit_limit
                    },
                });
            });
        });

        const result = {
            currencies,
            depositPeriods
        }
        
        return result;
    }

    public async createDeposit (dto: IDepositCreateDto): Promise<IDepositCreateResult> {
        const { data } = await this.http.post<IDepositCreateResult>('/deposit/create', dto);

        return data;
    }

    public async getMyDeposits (): Promise<IDepositListResult> {
        const { data } = await this.http.get<IDepositListResult>('/depositList');

        return data;
    }

    public async getHistory (dto: IDepositHistoryDto): Promise<IDepositHistoryResult> {
        const { data } = await this.http.get<IDepositHistoryResult>(`/depositHistory/${dto.id}`);

        return data;
    }

    public async topUp (dto: IDepositTopUpDto) {
        const { data } = await this.http.post('/deposit/topUp', dto);

        return data;
    }
}
