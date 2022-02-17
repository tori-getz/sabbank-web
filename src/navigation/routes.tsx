
import type { Routes } from '@typing';

import {
    DashboardScreen,
    LoginScreen
} from '@screens';

import { depositRoutes } from './stacks';

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
    },
    ...depositRoutes
];
