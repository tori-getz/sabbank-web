
import React, { useEffect } from 'react';

import {
    Navigation,
    routes
} from '@navigation';

import { overrideThemeVariables } from 'ui-neumorphism'

interface IAppContainer {};

export const AppContainer: React.FC<IAppContainer> = () => {
    useEffect(() => {
        overrideThemeVariables({});
    }, []);

    return (
        <Navigation
            routes={routes}
        />
    )
}
