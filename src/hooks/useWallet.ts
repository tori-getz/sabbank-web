
import { useStore } from 'effector-react';

import { $totalBalance } from '@store/wallet';

import type {
    ITotalBalance
} from '@typing';

interface IUseWallet {
    totalBalance: ITotalBalance
}

export const useWallet = (): IUseWallet => {
    const totalBalance = useStore($totalBalance);

    return { totalBalance };
}
