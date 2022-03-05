
import type { Routes } from '@typing';

import {
    CreditScreen,
    CreditinfoScreen,
    CreditApplyScreen,
    CreditSuccessScreen
} from '@screens';

export const creditRoutes: Routes = [
    {
        path: '/credit',
        component: <CreditScreen />
    },
    {
        path: '/credit/:id',
        component: <CreditinfoScreen />
    },
    {
        path: '/credit/apply',
        component: <CreditApplyScreen />
    },
    {
        path: '/credit/success/:id',
        component: <CreditSuccessScreen />
    }
];
