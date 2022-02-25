
import type {
    IDepositGroup,
    IDepositSettingCurrency,
    IDepositPeriod
} from '@typing';

import { useStore } from 'effector-react';

import {
    $depositList,
    $totalAmount,
    $currencies,
    $depositPeriods,

    setDepositList,
    setTotalAmount,

    getDepositPeriodsFx
} from '@store/deposit';

import { DepositService } from '@services';

import { isEmpty } from 'lodash';

interface IUseDeposit {
    totalAmount: number
    currencies: Array<IDepositSettingCurrency>
    depositPeriods: Array<IDepositPeriod>
    getInfo: () => void
    depositList: Array<IDepositGroup>
    getDeposits: () => Promise<void>,
    getGroupByDepositId: (id: string) => IDepositGroup | null
}

export const useDeposit = (): IUseDeposit => {
    const depositService = new DepositService();

    const currencies = useStore($currencies);
    const depositPeriods = useStore($depositPeriods);

    const totalAmount = useStore($totalAmount);
    const depositList = useStore($depositList);

    const getDeposits = async (): Promise<void> => {
        try {
            const { total_amount, result } = await depositService.getMyDeposits();

            setTotalAmount(total_amount);
            setDepositList(result);
        } catch (e) {
            console.error(e);
        }
    }

    const getGroupByDepositId = (id: string): IDepositGroup | null => {
        if (isEmpty(depositList)) return null;

        for (let group of depositList) {
            for (let deposit of group.data) {
                if (deposit.id === id) return group;
            }
        }

        return null;
    }

    const getInfo = async (): Promise<void> => {
        getDepositPeriodsFx();
    }

    return {
        totalAmount,
        depositList,
        getDeposits,
        getGroupByDepositId,
        // @ts-ignore
        currencies,
        depositPeriods,
        getInfo
    }
}
