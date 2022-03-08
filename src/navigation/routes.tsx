
import type { Routes } from '@typing';

import {
    DashboardScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    ForgotVerifyScreen,
    ForgotChangePasswordScreen
} from '@screens';

import {
    dashboardRoutes,
    depositRoutes,
    cardRoutes,
    creditRoutes,
    settingsRoutes,
    supportRoutes
} from './stacks';

export const unauthorizedRoutes: Routes = [
    {
        path: '/login',
        component: <LoginScreen />
    },
    {
        path: '/register',
        component: <RegisterScreen />
    },
    {
        path: '/forgot',
        component: <ForgotPasswordScreen />
    },
    {
        path: '/forgot/verify',
        component: <ForgotVerifyScreen />
    },
    {
        path: '/forgot/changepassword',
        component: <ForgotChangePasswordScreen />
    }
]

export const authroizedRoutes: Routes = [
    ...dashboardRoutes,
    ...depositRoutes,
    ...cardRoutes,
    ...creditRoutes,
    ...settingsRoutes,
    ...supportRoutes
];
``