
import { $wallet } from '@store/domains';

import type {
    ITotalBalance,
    ICurrency
} from '@typing';

export const $totalBalance = $wallet.createStore<ITotalBalance>({});

export const $currencies = $wallet.createStore<ICurrency[]>([]);
