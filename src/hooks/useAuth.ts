
import { useStore } from 'effector-react';

import { AuthService } from '@services';

import type {
    IAuthDto,
    IAuthRegisterDto,
    IAuthRegisterVerifyDto
} from '@dtos';

import {
    $accessToken,

    setAccessToken,
    setRefreshToken,

    logout as logoutEvent
} from '@store/auth';

import {
    setUser
} from '@store/profile';

interface IUseAuth {
    isAuth: () => boolean
    login: (credentials: IAuthDto) => any,
    register: (credentials: IAuthRegisterDto) => Promise<any>
    verifyRegister: (dto: IAuthRegisterVerifyDto) => Promise<any>
    logout: () => void
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

    const register = async (credentials: IAuthRegisterDto): Promise<any> => {
        return await authService.register(credentials);
    }

    const verifyRegister = async (dto: IAuthRegisterVerifyDto): Promise<any> => {
        return await authService.verify(dto);
    }

    const logout = () => {
        logoutEvent();
    }

    return {
        isAuth,
        login,
        register,
        verifyRegister,
        logout
    }
}
