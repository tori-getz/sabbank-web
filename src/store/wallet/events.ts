
import { $wallet } from '@store/domains';

import type {
    IWalletTotalBalance,
    IWalletCurrency
} from '@typing';

export const setTotalBalance = $wallet.createEvent<IWalletTotalBalance>('set total balance');
export const setCurrencies = $wallet.createEvent<IWalletCurrency[]>('set currencies');
