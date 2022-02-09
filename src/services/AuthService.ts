import type { AxiosInstance } from "axios";

import { HTTPClient } from "@http";
import type {
    IAuthDto,
    IAuthResponse,
    IAuthTokens
} from "@dtos";

import {
    $refreshToken,

    logout,
    setAccessToken,
    setRefreshToken
} from '@store/auth';

export class AuthService {
    private http: AxiosInstance;

    public constructor () {
        this.http = HTTPClient;
    }

    async login (credentials: IAuthDto): Promise<IAuthResponse> {
        const { data } = await this.http.post<IAuthResponse>('/auth/login', credentials);;
        
        return data;
    }
    
    static refreshToken (): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const refreshToken = $refreshToken.getState();

                const { data } = await HTTPClient.post<IAuthTokens>('/auth/refresh', { refresh: refreshToken });

                setAccessToken(data.access);
                setRefreshToken(data.refresh);

                resolve(data.access);
            } catch (e) {
                logout();
                reject();
            }
        })
    }
}
