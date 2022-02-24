
import { Routes } from '@typing';

import {
    DepositScreen,
    DepositInfoScreen
} from '@screens';

export const depositRoutes: Routes = [
    {
        path: '/deposit',
        component: <DepositScreen />
    },
    {
        path: '/deposit/:id',
        component: <DepositInfoScreen />
    }
];
