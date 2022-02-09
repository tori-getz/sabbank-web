
import { useStore } from 'effector-react';

import { AuthService } from '@services';

import type { IAuthDto } from '@dtos';

import {
    $accessToken,

    setAccessToken,
    setRefreshToken
} from '@store/auth';

import {
    setUser
} from '@store/user';

import { HTTPClient } from '@http';

interface IUseAuth {
    isAuth: () => boolean
    login: (credentials: IAuthDto) => any
}

export const useAuth = (): IUseAuth => {
    const authService = new AuthService();

    const accessToken: string = useStore($accessToken);

    const isAuth = () => accessToken !== '';

    const login = async (credentials: IAuthDto) => {
        try {
            const { token, user } = await authService.login(credentials);

            setUser(user);
    
            setRefreshToken(token.refresh);
            setAccessToken(token.access);
        } catch (e) {
            throw new Error(e.response?.data?.detail);
        }
    }

    return {
        isAuth,
        login
    }
}
