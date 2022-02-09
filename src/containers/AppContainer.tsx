
import React, { useEffect } from 'react';

import {
    Navigation,
    authroizedRoutes,
    unauthorizedRoutes
} from '@navigation';

import { useAuth } from '@hooks';

import { overrideThemeVariables } from 'ui-neumorphism'

interface IAppContainer {};

export const AppContainer: React.FC<IAppContainer> = () => {
    const { isAuth } = useAuth();

    useEffect(() => {
        overrideThemeVariables({});
    }, []);

    return (
        <Navigation
            routes={isAuth() ? authroizedRoutes : unauthorizedRoutes}
        />
    )
}
