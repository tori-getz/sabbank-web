
import {
    CreditService,
    CryptoCurrencyService
} from '@services';

import { useStore } from 'effector-react';

import {
    $creditsList,
    $creditSettings,
    setCreditsList,
    getCreditInfoFx
} from '@store/credit';

import type {
    ICredit,
    ICreditSetting
} from '@typing';

import type {
    ICreditGetDto
} from '@dtos';

interface IUseCredit {
    creditsList: Array<ICredit>
    getCredits: () => Promise<void>
    getCredit: (dto: ICreditGetDto) => Promise<ICredit>
    getCreditAmount: (amount: string, asset: string) => Promise<string>
    settings: Array<ICreditSetting>
    getSettings: () => Promise<void>
}

export const useCredit = (): IUseCredit => {
    const creditService = new CreditService();
    const cryptoCurrencyService = new CryptoCurrencyService();

    const creditsList = useStore($creditsList);
    const settings = useStore($creditSettings);

    const getCredits = async (): Promise<void> => {
        try {
            const data = await creditService.getCredits();

            setCreditsList(data);
        } catch (e) {
            console.error(e);
        }
    }

    const getCredit = async (dto: ICreditGetDto): Promise<ICredit> => {
        const credit = await creditService.getCredit(dto);

        return credit;
    }

    const getCreditAmount = async (amount: string, asset: string): Promise<string> => {
        try {
            const { result } = await cryptoCurrencyService.aetExchangeRate({
                asset_from: asset,
                asset_to: 'usdt',
                amount: Number(amount)
            });

            return result;
        } catch (e) {
            console.error(e);
        }
    }

    const getSettings = async (): Promise<void> => {
        try {
            getCreditInfoFx()
        } catch (e) {
            console.error(e);
        }
    }

    return {
        creditsList,
        settings,
        getCredits,
        getCredit,
        getCreditAmount,
        getSettings
    }
}
