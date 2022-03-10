
import type { Routes } from '@typing';

import {
    WalletInfoScreen,
    WalletListScreen
} from '@screens';

export const walletScreens: Routes = [
    {
        path: '/wallet',
        component: <WalletListScreen />
    },
    {
        path: '/wallet/:id',
        component: <WalletInfoScreen />
    }
];
