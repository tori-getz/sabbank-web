
import React from 'react';
import { Navbar } from '@components/ui'
import { ScreenContainer } from '@containers';

interface IDashboardScreen {};

export const DashboardScreen: React.FC<IDashboardScreen> = () => {
    return (
        <ScreenContainer title='DashboardScreen'>
            <Navbar />
            <h1>hello</h1>
        </ScreenContainer>
    )
}
