
import React from 'react';

import { ScreenContainer } from '@containers';

interface IHelloScreen {};

export const HelloScreen: React.FC<IHelloScreen> = () => {
    return (
        <ScreenContainer title='HelloScreen'>
            <h1>hello</h1>
        </ScreenContainer>
    )
}
