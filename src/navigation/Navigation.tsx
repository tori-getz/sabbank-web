
import React from 'react';

import {
    BrowserRouter as Router,
    Route,
    Routes as Switch,
    Navigate
} from 'react-router-dom';

import type {
    IRoute,
    Routes
} from '@typing';

import { useAuth } from '@hooks';

interface INavigation {
    routes: Routes
};

export const Navigation: React.FC<INavigation> = ({
    routes
}) => {
    const { isAuth } = useAuth();

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
                <Route
                    path='*'
                    element={<Navigate to={isAuth() ? '/dashboard' : '/login'} />}
                />
            </Switch>
        </Router>
    )
}