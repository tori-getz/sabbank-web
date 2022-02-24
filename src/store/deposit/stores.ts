
import { $deposit } from '@store/domains';

import type {
    IDepositGroup
} from '@typing';

export const $totalIncome = $deposit.createStore<number>(0);
export const $totalAmount = $deposit.createStore<number>(0);

export const $depositList = $deposit.createStore<IDepositGroup[]>([]);
