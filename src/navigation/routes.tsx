
import type { Routes } from '@typing';

import {
    DashboardScreen,
    HelloScreen
} from '@screens';

export const unauthorizedRoutes: Routes = [
    {
        path: '/',
        component: <HelloScreen />
    }
]

export const authroizedRoutes: Routes = [
    {
        path: '/',
        component: <DashboardScreen />
    }
];
