
import type { Routes } from '@typing';

import {
    ForgotChangePasswordScreen,
    ForgotVerifyScreen,
    ForgotPasswordScreen
} from '@screens';

export const forgotRoutes: Routes = [
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
];
