
import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Routes as Switch
} from 'react-router-dom';

import type {
    IRoute,
    Routes
} from '@typing';

import { HelloScreen } from '@screens';

interface INavigation {
    routes: Routes
};

export const Navigation: React.FC<INavigation> = ({
    routes
}) => {
    return (
        <Router> 
            <Switch>
                {routes.map((route: IRoute, key: number) => (
                    <Route
                        path={route.path}
                        element={route.component}
                        key={key}
                    />
                ))}
            </Switch>
        </Router>
    )
}