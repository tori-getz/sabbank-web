
import { Routes } from '@typing';

import {
    DepositScreen,
    DepositInfoScreen,
    NewDepositScreen,
    CalculateDepositScreen
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
    }
];
