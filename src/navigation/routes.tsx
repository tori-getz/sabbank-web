
import type { Routes } from '@typing';

import {
    DashboardScreen,
    LoginScreen
} from '@screens';

export const unauthorizedRoutes: Routes = [
    {
        path: '/login',
        component: <LoginScreen />
    }
]

export const authroizedRoutes: Routes = [
    {
        path: '/dashboard',
        component: <DashboardScreen />
    }
];
