
import { CreditService } from '@services';

import { useStore } from 'effector-react';

import {
    $creditsList,
    setCreditsList
} from '@store/credit';

import type {
    ICredit
} from '@typing';

interface IUseCredit {
    creditsList: Array<ICredit>
    getCredits: () => Promise<void>
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

    return {
        creditsList,
        getCredits
    }
}
