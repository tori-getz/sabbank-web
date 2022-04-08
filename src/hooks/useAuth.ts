
import { useStore } from 'effector-react';

import { AuthService } from '@services';

import type {
    IAuthDto,
    IAuthRegisterDto,
    IAuthRegisterVerifyDto,
    IAuthRegisterCompleteRegisterDto,
    IAuthChangePasswordDto
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
    accessToken: string
    isAuth: () => boolean
    login: (credentials: IAuthDto) => Promise<void>
    logout: () => void
    register: (credentials: IAuthRegisterDto) => Promise<any>
    verifyRegister: (dto: IAuthRegisterVerifyDto) => Promise<any>
    completeRegister: (dto: IAuthRegisterCompleteRegisterDto) => Promise<void>
    changePassword: (dto: IAuthChangePasswordDto) => Promise<any>
}

export const useAuth = (): IUseAuth => {
    const authService = new AuthService();

    const accessToken: string = useStore($accessToken);

    const isAuth = () => accessToken !== '';

    const login = async (credentials: IAuthDto): Promise<void> => {
        try {
            const { token, user } = await authService.login(credentials);

            setUser(user);
    
            setRefreshToken(token.refresh);
            setAccessToken(token.access);
        } catch (e) {
            throw new Error(e.response?.data?.detail);
        }
    }

    const logout = () => {
        logoutEvent();
    }

    const register = async (credentials: IAuthRegisterDto): Promise<any> => {
        return await authService.register(credentials);
    }

    const verifyRegister = async (dto: IAuthRegisterVerifyDto): Promise<any> => {
        return await authService.verify(dto);
    }

    const completeRegister = async (dto: IAuthRegisterCompleteRegisterDto): Promise<void> => {
        try {
            const { token, user } = await authService.completeRegister(dto);

            setUser(user);

            setRefreshToken(token.refresh);
            setAccessToken(token.access);
        } catch (e) {
            console.error(e);
        }
    }

    const changePassword = async (dto: IAuthChangePasswordDto): Promise<any> => {
        return await authService.changePassword(dto);
    }

    return {
        accessToken,
        isAuth,
        login,
        logout,
        register,
        verifyRegister,
        completeRegister,
        changePassword
    }
}
