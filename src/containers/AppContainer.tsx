
import React from 'react';

import {
    Navigation,
    routes
} from '@navigation';

interface IAppContainer {};

export const AppContainer: React.FC<IAppContainer> = () => {
    return (
        <Navigation
            routes={routes}
        />
    )
}
