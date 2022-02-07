
import React from 'react';

import {
    BrowserRouter
} from 'react-router-dom';



interface IAppContainer {};

export const AppContainer: React.FC<IAppContainer> = () => {
    return (
        <BrowserRouter>
            <h1>hello world</h1>
        </BrowserRouter>
    )
}
