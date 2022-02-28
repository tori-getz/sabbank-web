
import type {
    IDepositGroup,
    IDepositSettingCurrency,
    IDepositPeriod
} from '@typing';

import type {
    IDepositCreateDto,
    IDepositCreateResult,
    IDepositHistoryResult,
    IDepositHistoryDto
} from '@dtos';

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
    getDepositHistory: (dto: IDepositHistoryDto) => Promise<IDepositHistoryResult>
    getDeposits: () => Promise<void>
    createDeposit: (dto: IDepositCreateDto) => Promise<IDepositCreateResult>
    getGroupByDepositId: (id: string) => IDepositGroup | null
}

export const useDeposit = (): IUseDeposit => {
    const depositService = new DepositService();

    const currencies = useStore($currencies);
    const depositPeriods = useStore($depositPeriods);

    const totalAmount = useStore($totalAmount);
    const depositList = useStore($depositList);

    const createDeposit = async (dto: IDepositCreateDto): Promise<IDepositCreateResult> => {
        try {
            return await depositService.createDeposit(dto);
        } catch (e) {
            console.error(e);
        }
    } 

    const getDepositHistory = async (dto: IDepositHistoryDto): Promise<IDepositHistoryResult> => {
        try {
            return await depositService.getHistory(dto);
        } catch (e) {
            console.error(e);
        }
    }

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
        createDeposit,
        getDepositHistory,
        // @ts-ignore
        currencies,
        depositPeriods,
        getInfo
    }
}
