
import { $wallet } from '@store/domains';

import type {
    IWalletTotalBalance,
    IWalletCurrency,
    IWalletTransaction,
    IWalletRate
} from '@typing';

export const $totalBalance = $wallet.createStore<IWalletTotalBalance>({});

export const $currencies = $wallet.createStore<IWalletCurrency[]>([]);
export const $rateData = $wallet.createStore<IWalletRate[]>([]);

export const $transactions = $wallet.createStore<IWalletTransaction[]>([]);

export const $exchangeHistory = $wallet.createStore([]);
