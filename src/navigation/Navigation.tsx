
import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Switch } from 'react-router';

import { routes } from './routes';
import type { IRoute } from '@typing';

interface INavigation {};

export const Navigation: React.FC<INavigation> = () => {
    return (
        <BrowserRouter> 
            <Switch>

            </Switch>
        </BrowserRouter>
    )
}