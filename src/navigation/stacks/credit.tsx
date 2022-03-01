
import type { Routes } from '@typing';

import {
    CreditScreen,
    CreditinfoScreen
} from '@screens';

export const creditRoutes: Routes = [
    {
        path: '/credit',
        component: <CreditScreen />
    },
    {
        path: '/credit/:id',
        component: <CreditinfoScreen />
    }
];
