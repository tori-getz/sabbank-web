
import { useStore } from 'effector-react';

import { $totalBalance, $currencies, getCurrenciesFx } from '@store/wallet';

import type {
    ITotalBalance,
    iCurrency
} from '@typing';

interface IUseWallet {
    totalBalance: ITotalBalance,
    currencies: Array<iCurrency>
    getCurrencies: () => void
}

export const useWallet = (): IUseWallet => {
    const totalBalance = useStore($totalBalance);
    const currencies = useStore($currencies);

    const getCurrencies = () => {
        getCurrenciesFx();
    }

    return {
        totalBalance,
        currencies,
        getCurrencies
    };
}
