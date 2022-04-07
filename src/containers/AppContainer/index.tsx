
import React, { useEffect } from 'react';

import {
    Navigation,
    authroizedRoutes,
    unauthorizedRoutes
} from '@navigation';

import {
    useAuth,
    useSocket
} from '@hooks';

import { overrideThemeVariables } from 'ui-neumorphism'

interface IAppContainer {};

export const AppContainer: React.FC<IAppContainer> = () => {
    const {
        accessToken,
        isAuth
    } = useAuth();

    useSocket();

    useEffect(() => {
        overrideThemeVariables({
                '--light-bg': '#F5F5F9',
                '--light-bg-dark-shadow': '#DEDEE9',
                '--light-bg-light-shadow': '#FFFFFF',
                '--dark-bg': '#292E35',
                '--dark-bg-dark-shadow': '#21252a',
                '--dark-bg-light-shadow': '#313740',
                '--primary': '#AB2AFF',
                '--primary-dark': '#4526f9',
                '--primary-light': '#c7befd',
        });
    }, []);

    return (
        <Navigation
            routes={isAuth() ? authroizedRoutes : unauthorizedRoutes}
        />
    )
}
