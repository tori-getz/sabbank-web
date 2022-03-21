import type { AxiosInstance } from "axios";

import { HTTPClient } from "@http";
import type {
    IAuthDto,
    IAuthRegisterDto,
    IAuthRegisterVerifyDto,
    IAuthRegisterCompleteRegisterDto,
    IAuthResponse,
    IAuthTokens,
    IAuthRestoreDto,
    IAuthRestoreVerifyDto,
    IAuthRestoreVerifyResponse,
    IAuthRestoreCompleteDto
} from "@dtos";

import {
    $refreshToken,

    logout,
    setAccessToken,
    setRefreshToken
} from '@store/auth';

import type { IUser } from '@typing';

export class AuthService {
    private http: AxiosInstance;

    public constructor () {
        this.http = HTTPClient;
    }

    public async login (dto: IAuthDto): Promise<IAuthResponse> {
        const { data } = await this.http.post<IAuthResponse>('/auth/login', dto);;
        
        return data;
    }

    public async register (dto: IAuthRegisterDto) {
        const { data } = await this.http.post('/auth/register', dto);

        return data;
    }

    public async verify (dto: IAuthRegisterVerifyDto) {
        const { data } = await this.http.post('/auth/verify', dto);

        return data;
    }

    public async completeRegister (dto: IAuthRegisterCompleteRegisterDto): Promise<IAuthResponse> {
        const { data } = await this.http.post<IAuthResponse>('/auth/completeRegister', dto);

        return data;
    }

    public async getProfile (): Promise<IUser> {
        const { data } = await this.http.get<IUser>('/user/profile'); 

        return data;
    }

    public async restore (dto: IAuthRestoreDto): Promise<void> {
        await this.http.post('/auth/restore', dto);
    }

    public async restoreVerify (dto: IAuthRestoreVerifyDto): Promise<IAuthRestoreVerifyResponse> {
        const { data } = await this.http.post<IAuthRestoreVerifyResponse>('/auth/restoreVerify', dto);

        return data;
    }

    public async restoreComplete (dto: IAuthRestoreCompleteDto): Promise<void> {
        const { data } = await this.http.post('/auth/restoreComplete', dto);
    }
    
    public static refreshToken (): Promise<string> {
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
