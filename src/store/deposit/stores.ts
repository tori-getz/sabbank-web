
import { $deposit } from '@store/domains';

import type {
    IDepositGroup,
    IDepositSettingCurrency,
    IDepositPeriod
} from '@typing';

export const $totalIncome = $deposit.createStore<number>(0);
export const $totalAmount = $deposit.createStore<number>(0);

export const $depositList = $deposit.createStore<IDepositGroup[]>([]);

export const $currencies = $deposit.createStore<IDepositSettingCurrency[]>([]);
export const $depositPeriods = $deposit.createStore<IDepositPeriod[]>([]);
