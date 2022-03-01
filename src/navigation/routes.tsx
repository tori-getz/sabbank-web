
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
    depositRoutes,
    cardRoutes,
    creditRoutes,
    settingsRoutes
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
    {
        path: '/dashboard',
        component: <DashboardScreen />
    },
    ...depositRoutes,
    ...cardRoutes,
    ...creditRoutes,
    ...settingsRoutes
];
