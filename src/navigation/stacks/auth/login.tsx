
import type { Routes } from '@typing';

import {
    LoginScreen
} from '@screens';

export const loginRoutes: Routes = [
    {
        path: '/login',
        component: <LoginScreen />
    }
];
