
import { useStore } from 'effector-react';

import {
    $totalBalance,
    $currencies,
    $transactions,
    getCurrenciesFx,
    getTransactionsFx,
    setCurrencies
} from '@store/wallet';

import { WalletService } from '@services';

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
    walletsIsCreated: () => boolean
    createWallets: () => Promise<void>
}

export const useWallet = (): IUseWallet => {
    const walletService = new WalletService();

    const totalBalance = useStore($totalBalance);
    const currencies = useStore($currencies);
    const transactions = useStore($transactions);

    const walletsIsCreated = (): boolean => {
        let createdWallets = [];

        for (const { address } of currencies) {
            if (!address) continue;

            createdWallets.push(address);
        }

        return currencies.length === createdWallets.length;
    }

    const createWallets = async (): Promise<void> => {
        const createdWallets = await walletService.createWallets();

        setCurrencies(createdWallets);
    }

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
        getTransactions,
        walletsIsCreated,
        createWallets
    };
}
