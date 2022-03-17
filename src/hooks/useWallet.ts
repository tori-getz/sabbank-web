
import { useStore } from 'effector-react';

import {
    $totalBalance,
    $currencies,
    $transactions,
    getCurrenciesFx,
    getTransactionsFx
} from '@store/wallet';

import type {
    IWalletTotalBalance,
    IWalletCurrency,
    IWalletTransaction
} from '@typing';

interface IUseWallet {
    totalBalance: IWalletTotalBalance,
    currencies: Array<IWalletCurrency>
    transactions: Array<IWalletTransaction>
    getCurrencies: () => void
    getTransactions: () => void
}

export const useWallet = (): IUseWallet => {
    const totalBalance = useStore($totalBalance);
    const currencies = useStore($currencies);
    const transactions = useStore($transactions);

    const getCurrencies = () => {
        getCurrenciesFx();
    }

    const getTransactions = () => {
        getTransactionsFx();
    }

    return {
        totalBalance,
        currencies,
        transactions,
        getCurrencies,
        getTransactions
    };
}
