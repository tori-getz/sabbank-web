
import {
    $user,
    getUserFx,
    setUser,
    getFiatListFx,
    $fiatList
} from '@store/profile';
import { useStore } from 'effector-react';

import type {
    IProfileUpdateDto,
    IProfileUpdatePhoneDto
} from '@dtos';

import type {
    IUser,
    IUserSettings,
    IUserFiatCurrency
} from '@typing';

import { ProfileService } from '@services';

interface IUseProfile {
    user: IUser,
    fiatList: Array<IUserFiatCurrency>
    settings: IUserSettings,
    getUser: () => void
    updateProfile: (dto: IProfileUpdateDto) => Promise<IUser>;
    updatePhone: (dto: IProfileUpdatePhoneDto) => Promise<IUser>;
    updateSettings: (settings: IUserSettings) => void,
    getFiatList: () => void
}

export const useProfile = (): IUseProfile => {
    const profileService = new ProfileService();

    const user: IUser = useStore($user);
    const fiatList: Array<IUserFiatCurrency> = useStore($fiatList);

    const settings: IUserSettings = user?.settings;

    const getUser = () => {
        getUserFx()
    };

    const updateProfile = async (dto: IProfileUpdateDto): Promise<IUser> => {
        try {
            const user = await profileService.updateProfile(dto);

            setUser(user);

            return user;
        } catch (e) {
            console.error(e);
        }
    }

    const updatePhone = async (dto: IProfileUpdatePhoneDto): Promise<IUser> => {
        try {
            const user = await profileService.updatePhone(dto);

            return user;
        } catch (e) {
            console.error(e);
        }
    }

    const updateSettings = async (settings: IUserSettings) => {
        try {
            await profileService.updateSettings(settings);

            setUser({ ...user, settings });
        } catch (e) {
            console.error(e);
        }
    }

    const getFiatList = () => {
        getFiatListFx();
    }

    return {
        fiatList,
        settings,
        user,
        getUser,
        updateProfile,
        updatePhone,
        updateSettings,
        getFiatList
    };
}
