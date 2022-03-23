
import type { AxiosInstance } from 'axios';

import { HTTPClient } from '@http';

import type {
    IUser2FAInfo
} from '@typing';

import type {
    IProfile2FAToggleDto
} from '@dtos';

export class TwoFactorAuthService {
    private http: AxiosInstance;

    public constructor () {
        this.http = HTTPClient;
    }

    public async getInfo (): Promise<IUser2FAInfo> {
        const { data } = await this.http.get<IUser2FAInfo>('/2fa');

        return data;
    }

    public async enable (dto: IProfile2FAToggleDto): Promise<any> {
        const { data } = await this.http.post('/2fa/enable', dto);

        return data;
    }
}
