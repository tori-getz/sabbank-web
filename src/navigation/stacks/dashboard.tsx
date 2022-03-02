
import type { Routes } from '@typing';

import {
    DashboardScreen,
    ReceiveScreen,
    TransferScreen,
    ExchangeScreen,
    CashoutScreen
} from '@screens';

export const dashboardRoutes: Routes = [
    {
        path: '/dashboard',
        component: <DashboardScreen />
    },
    {
        path: '/receive',
        component: <ReceiveScreen />
    },
    {
        path: '/transfer',
        component: <TransferScreen />
    },
    {
        path: '/exchange',
        component: <ExchangeScreen />
    },
    {
        path: '/cashout',
        component: <CashoutScreen />
    },
];
