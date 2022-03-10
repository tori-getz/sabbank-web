
import type { AxiosInstance } from 'axios';

import type {
    IProfileUpdateDto,
    IProfileUpdatePhoneDto,
    IProfileUpdateSettingsDto
} from '@dtos';

import type {
    IUser,
    IUserFiatCurrency
} from '@typing';

import { HTTPClient } from '@http';

export class ProfileService {
    private http: AxiosInstance;

    public constructor () {
        this.http = HTTPClient;
    }

    public async updateProfile (dto: IProfileUpdateDto): Promise<IUser> {
        const { data } = await this.http.post<IUser>('/user/profile', dto);

        return data;
    }

    public async updatePhone (dto: IProfileUpdatePhoneDto) {
        const { data } = await this.http.post('/user/profile/phone', dto);

        return data;
    }

    public async updateSettings (dto: IProfileUpdateSettingsDto): Promise<IUser> {
        const { data } = await this.http.post<IUser>('/user/settings', dto);

        return data;
    }

    public async getFiatList (): Promise<IUserFiatCurrency[]> {
        const { data } = await this.http.get<IUserFiatCurrency[]>('/fiatList');

        return data;
    }
}
