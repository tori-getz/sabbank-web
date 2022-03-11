
import type { Routes } from '@typing';

import {
    loginRoutes,
    registerRoutes,
    forgotRoutes,

    dashboardRoutes,
    depositRoutes,
    cardRoutes,
    creditRoutes,
    settingsRoutes,
    supportRoutes,
    walletScreens
} from './stacks';

export const unauthorizedRoutes: Routes = [
    ...loginRoutes,
    ...registerRoutes,
    ...forgotRoutes
]

export const authroizedRoutes: Routes = [
    ...dashboardRoutes,
    ...depositRoutes,
    ...cardRoutes,
    ...creditRoutes,
    ...settingsRoutes,
    ...supportRoutes,
    ...walletScreens
];