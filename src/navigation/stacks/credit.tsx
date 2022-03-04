
import type { Routes } from '@typing';

import {
    CreditScreen,
    CreditinfoScreen,
    CreditApplyScreen
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
    }
];
