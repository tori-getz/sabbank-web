
import type { Routes } from '@typing';

import {
    SupportScreen,
    SupportFormScreen,
    FaqScreen,
    FaqThemeScreen
} from '@screens';

export const supportRoutes: Routes = [
    {
        path: '/support',
        component: <SupportScreen />
    },
    {
        path: '/support/form',
        component: <SupportFormScreen />
    },
    {
        path: '/support/faq',
        component: <FaqScreen />
    },
    {
        path: '/support/faq/theme',
        component: <FaqThemeScreen />
    }
];
