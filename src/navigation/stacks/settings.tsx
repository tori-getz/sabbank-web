
import type { Routes } from '@typing';

import {
    SettingsScreen
} from '@screens';

export const settingsRoutes: Routes = [
    {
        path: '/settings',
        component: <SettingsScreen />
    }
];
