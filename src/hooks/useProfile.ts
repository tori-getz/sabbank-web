
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
    IProfileUpdatePhoneDto,
    IProfileUpdateSettingsDto
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
    updateSettings: (settings: IProfileUpdateSettingsDto) => Promise<void>,
    getFiatList: () => void
    getFullname: () => string
    getInitials: (fullName: string) => string
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

    const updateSettings = async (dto: IProfileUpdateSettingsDto): Promise<void> => {
        try {
            const user = await profileService.updateSettings(dto);

            setUser({ ...user });
        } catch (e) {
            console.error(e);
        }
    }

    const getFiatList = () => {
        getFiatListFx();
    }

    const getFullname = (): string => {
        const name: string = `${user?.first_name || ''} ${user?.last_name || ''}`;

        if (name === ' ') return 'User'

        return name;
    }

    const getInitials = (fullName: string): string => {
        let initials: Array<string> = [];
        
        for (let word of fullName.split(' ')) {
            const firstSymbol = word?.split('')[0];

            initials.push(firstSymbol?.toUpperCase());
        }

        return initials.join('');
    }

    return {
        fiatList,
        settings,
        user,
        getUser,
        updateProfile,
        updatePhone,
        updateSettings,
        getFiatList,
        getFullname,
        getInitials
    };
}
