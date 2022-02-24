
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

interface IUseDeposit {
    totalAmount: number
    depositList: Array<IDepositGroup>
    getDeposits: () => Promise<void>
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

    return {
        totalAmount,
        depositList,
        getDeposits
    }
}
