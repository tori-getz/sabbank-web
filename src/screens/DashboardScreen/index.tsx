
import React from 'react';
import { Navbar } from '@components/ui'
import { ScreenContainer } from '@containers';
import { Button } from 'ui-neumorphism';
import { Container } from 'react-bootstrap';

interface IDashboardScreen {};

export const DashboardScreen: React.FC<IDashboardScreen> = () => {
    return (
        <ScreenContainer title='DashboardScreen'>
            <Navbar />
            <Container>
                <Button>кнопка</Button>
            </Container>
            <h1>hello</h1>
        </ScreenContainer>
    )
}
