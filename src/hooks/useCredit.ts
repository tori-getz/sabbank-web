
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
    ICreditGetDto,
    ICreditCreateDto,
    ICreditPrepareDto,
    ICreditIncreaseCollateralDto
} from '@dtos';

interface IUseCredit {
    creditsList: Array<ICredit>
    getCredits: () => Promise<void>
    getCredit: (dto: ICreditGetDto) => Promise<ICredit>
    getCreditAmount: (amount: string, asset: string, ltv: number) => Promise<string>
    settings: Array<ICreditSetting>
    getSettings: () => Promise<void>
    prepareCredit: (dto: ICreditPrepareDto) => Promise<ICredit>
    createCredit: (dto: ICreditCreateDto) => Promise<ICredit>,
    increaseCollateral: (dto: ICreditIncreaseCollateralDto) => Promise<ICredit>
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

    const getCreditAmount = async (amount: string, asset: string, ltv: number): Promise<string> => {
        try {
            const { result } = await cryptoCurrencyService.aetExchangeRate({
                asset_from: asset,
                asset_to: 'usdt',
                amount: Number(amount)
            });

            const loanAmount = Number(result) * (ltv / 100);

            return loanAmount.toString();
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

    const prepareCredit = async (dto: ICreditPrepareDto): Promise<ICredit> => {
        return await creditService.prepare(dto);
    }

    const createCredit = async (dto: ICreditCreateDto): Promise<ICredit> => {
        return await creditService.create(dto);
    }

    const increaseCollateral = async (dto: ICreditIncreaseCollateralDto): Promise<ICredit> => {
        return await creditService.increaseCollateral(dto);
    }

    return {
        creditsList,
        settings,
        getCredits,
        getCredit,
        getCreditAmount,
        getSettings,
        prepareCredit,
        createCredit,
        increaseCollateral
    }
}
