
import { $wallet } from '@store/domains';

import type {
    ITotalBalance,
    iCurrency
} from '@typing';

export const $totalBalance = $wallet.createStore<ITotalBalance>({});

export const $currencies = $wallet.createStore<iCurrency[]>([]);
