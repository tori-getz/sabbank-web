
import type {
    IDepositGroup
} from '@typing';

import { useStore } from 'effector-react';

import {
    $depositList,
    $totalAmount,

    setDepositList,
    setTotalAmount
} from '@store/deposit';

import { DepositService } from '@services';

import { isEmpty } from 'lodash';

interface IUseDeposit {
    totalAmount: number
    depositList: Array<IDepositGroup>
    getDeposits: () => Promise<void>,
    getGroupByDepositId: (id: string) => IDepositGroup | null
}

export const useDeposit = (): IUseDeposit => {
    const depositService = new DepositService();

    const totalAmount = useStore($totalAmount);
    const depositList = useStore($depositList);

    const getDeposits = async () => {
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

    return {
        totalAmount,
        depositList,
        getDeposits,
        getGroupByDepositId
    }
}
