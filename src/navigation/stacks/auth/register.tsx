
import type { Routes } from '@typing';

import {
    RegisterScreen,
    RegisterVerifyScreen,
    RegisterPinCodeScreen
} from '@screens';

export const registerRoutes: Routes = [
    {
        path: '/register',
        component: <RegisterScreen />
    },
    {
        path: '/register/verify',
        component: <RegisterVerifyScreen />
    },
    {
        path: '/register/pincode',
        component: <RegisterPinCodeScreen />
    }
]
