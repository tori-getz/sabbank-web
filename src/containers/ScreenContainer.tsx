
import React from 'react';

import { Helmet } from 'react-helmet';

interface IScreenContainer {
    title?: string,
    children?: React.ReactNode
}

export const ScreenContainer: React.FC<IScreenContainer> = ({
    title = 'Screen',
    children
}) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </>
    )
}
