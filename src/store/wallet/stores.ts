
import { $wallet } from '@store/domains';

import type {
    IWalletTotalBalance,
    IWalletCurrency,
    IWalletTransaction
} from '@typing';

export const $totalBalance = $wallet.createStore<IWalletTotalBalance>({});

export const $currencies = $wallet.createStore<IWalletCurrency[]>([]);
export const $rateData = $wallet.createStore([]);

export const $transactions = $wallet.createStore<IWalletTransaction[]>([]);
