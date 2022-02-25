
import { Routes } from '@typing';

import {
    DepositScreen,
    DepositInfoScreen,
    NewDepositScreen
} from '@screens';

export const depositRoutes: Routes = [
    {
        path: '/deposit',
        component: <DepositScreen />
    },
    {
        path: '/deposit/new',
        component: <NewDepositScreen />
    },
    {
        path: '/deposit/:id',
        component: <DepositInfoScreen />
    }
];
