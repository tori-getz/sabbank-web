
import type { Routes } from '@typing';

import {
    DashboardScreen,
    LoginScreen,
    RegisterScreen
} from '@screens';

import {
    depositRoutes,
    cardRoutes,
    creditRoutes
} from './stacks';

export const unauthorizedRoutes: Routes = [
    {
        path: '/login',
        component: <LoginScreen />
    },
    {
        path: '/register',
        component: <RegisterScreen />
    }
]

export const authroizedRoutes: Routes = [
    {
        path: '/dashboard',
        component: <DashboardScreen />
    },
    ...depositRoutes,
    ...cardRoutes,
    ...creditRoutes
];
