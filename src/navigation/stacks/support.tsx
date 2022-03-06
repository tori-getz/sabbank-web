
import type { Routes } from '@typing';

import {
    SupportScreen,
    FaqScreen,
    FaqThemeScreen
} from '@screens';

export const supportRoutes: Routes = [
    {
        path: '/support',
        component: <SupportScreen />
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
