
import React, { useEffect } from 'react';

import { Button } from 'ui-neumorphism';
import { Container } from 'react-bootstrap';

import { useSocket, useUser, useWallet } from '@hooks';
import cn from 'classnames';

import { ScreenContainer } from '@containers';
import { Navbar, Footer } from '@components/ui'
import { Balance, CurrencyList, WalletList } from '@components';
import styles from './DashboardScreen.module.sass';

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
            <div className='d-flex flex-column min-vh-100'>
                <Navbar />
                <Container className={cn(styles.containerLayout)}>
                    <aside className={styles.aside}>
                        <Balance />
                        <WalletList />
                        <CurrencyList />
                        <Button>кнопка</Button>
                    </aside>
                    <main className={styles.main}>
                        <h1>BODY</h1>
                    </main>
                </Container>
                <Footer /> 
            </div>
        </ScreenContainer>
    )
}
