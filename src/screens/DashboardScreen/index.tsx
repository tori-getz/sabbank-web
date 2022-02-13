
import React, { useEffect } from 'react';

import { Button } from 'ui-neumorphism';
import { Container } from 'react-bootstrap';

import { useSocket, useUser, useWallet } from '@hooks';

import { ScreenContainer } from '@containers';
import { Navbar, Footer } from '@components/ui'
import { Balance, CurrencyList } from '@components';

interface IDashboardScreen {};

export const DashboardScreen: React.FC<IDashboardScreen> = () => {
    useSocket();

    const { getUser } = useUser();
    const { getCurrencies } = useWallet();

    useEffect(() => {
        getUser();
        getCurrencies();
    }, []);

    return (
        <ScreenContainer title='DashboardScreen'>
            <Navbar />
            <Container className='d-flex flex-column min-vh-100'>
                <Balance />
                <CurrencyList />
                <Button>кнопка</Button>
            </Container>
            <Footer /> 
        </ScreenContainer>
    )
}
