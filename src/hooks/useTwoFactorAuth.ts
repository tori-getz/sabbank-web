
import { useMemo } from 'react';

import { useProfile } from './useProfile';

import { TwoFactorAuthService } from '@services';

import type { IUser2FAInfo } from '@typing';

import type {
    IProfile2FAToggleDto,
    IProfile2FAVerifyDto
} from '@dtos';

interface IUseTwoFactorAuth {
    enabled: boolean
    getInfo: () => Promise<IUser2FAInfo>
    enable: (dto: IProfile2FAToggleDto) => Promise<void>
    verify: (dto: IProfile2FAVerifyDto) => Promise<any>
}

export const useTwoFactorAuth = (): IUseTwoFactorAuth => {
    const twoFactorAuthService = new TwoFactorAuthService();

    const { settings } = useProfile();
    
    const enabled = useMemo(() => settings?.two_factor || false, [settings?.two_factor]);

    const getInfo = async (): Promise<IUser2FAInfo> => {
        return await twoFactorAuthService.getInfo();
    }

    const enable = async (dto: IProfile2FAToggleDto) => {
        return await twoFactorAuthService.enable(dto);
    }

    const verify = async (dto: IProfile2FAVerifyDto) => {
        return await twoFactorAuthService.verify(dto);
    }

    return {
        enabled,
        getInfo,
        enable,
        verify
    }
}
