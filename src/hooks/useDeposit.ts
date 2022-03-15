
import type {
    IDepositGroup,
    IDepositSettingCurrency,
    IDepositPeriod,
    IDepositWithdrawInfo
} from '@typing';

import type {
    IDepositCreateDto,
    IDepositCreateResult,
    IDepositHistoryResult,
    IDepositHistoryDto,
    IDepositTopUpDto,
    IDepositGetWithdrawInfoDto,
    IDepositWithdrawDto
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
    topUpDeposit: (dto: IDepositTopUpDto) => Promise<any>
    getWithdrawInfo: (dto: IDepositGetWithdrawInfoDto) => Promise<IDepositWithdrawInfo>
    withdraw: (dto: IDepositWithdrawDto) => Promise<IDepositWithdrawInfo>
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

    const topUpDeposit = async (dto: IDepositTopUpDto): Promise<any> => {
        return await depositService.topUp(dto);
    }

    const getWithdrawInfo = async (dto: IDepositGetWithdrawInfoDto): Promise<IDepositWithdrawInfo> => {
        return await depositService.getWithdrawInfo(dto);
    }

    const withdraw = async (dto: IDepositWithdrawDto): Promise<IDepositWithdrawInfo> => {
        return await depositService.withdraw(dto);
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
        getInfo,
        topUpDeposit,
        getWithdrawInfo,
        withdraw
    }
}
