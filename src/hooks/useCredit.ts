
import { CreditService } from '@services';

import { useStore } from 'effector-react';

import {
    $creditsList,
    setCreditsList
} from '@store/credit';

import type {
    ICredit
} from '@typing';

import type {
    ICreditGetDto
} from '@dtos';

interface IUseCredit {
    creditsList: Array<ICredit>
    getCredits: () => Promise<void>
    getCredit: (dto: ICreditGetDto) => Promise<ICredit>
}

export const useCredit = (): IUseCredit => {
    const creditService = new CreditService();

    const creditsList = useStore($creditsList);

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

    return {
        creditsList,
        getCredits,
        getCredit
    }
}
