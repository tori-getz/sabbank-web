
import { $deposit } from '@store/domains';

import type {
    IDepositGroup
} from '@typing';

export const setTotalIncome = $deposit.createEvent<number>('set total income');
export const setTotalAmount = $deposit.createEvent<number>('set total amount');

export const setDepositList = $deposit.createEvent<IDepositGroup[]>('set deposit list');
