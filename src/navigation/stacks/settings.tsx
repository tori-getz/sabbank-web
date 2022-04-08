
import type { Routes } from '@typing';

import {
    SettingsScreen,
    Settings2FAScreen,
    SettingsChangePasswordScreen
} from '@screens';

export const settingsRoutes: Routes = [
    {
        path: '/settings',
        component: <SettingsScreen />
    },
    {
        path: '/settings/2fa',
        component: <Settings2FAScreen />
    },
    {
        path: '/settings/changepassword',
        component: <SettingsChangePasswordScreen />
    }
];
