
import type { Routes } from '@typing';

import {
    DepositScreen,
    DepositInfoScreen,
    NewDepositScreen,
    CalculateDepositScreen,
    DepositSuccessScreen
} from '@screens';

export const depositRoutes: Routes = [
    {
        path: '/deposit',
        component: <DepositScreen />
    },
    {
        path: '/deposit/:id',
        component: <DepositInfoScreen />
    },
    {
        path: '/deposit/new',
        component: <NewDepositScreen />
    },
    {
        path: '/deposit/calculate',
        component: <CalculateDepositScreen />
    },
    {
        path: '/deposit/success/:id',
        component: <DepositSuccessScreen />
    }
];
