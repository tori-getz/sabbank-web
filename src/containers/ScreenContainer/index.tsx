
import React, { useEffect } from 'react';

import { Helmet } from 'react-helmet';

import cn from 'classnames';
import styles from './ScreenContainer.module.sass';

import { useAuth, useUser, useSocket, useWallet } from '@hooks';

import { Container } from 'react-bootstrap';

import { Navbar, Footer } from '@components/ui';
import { Balance, WalletList, CurrencyList } from '@components';

interface IScreenContainer {
    title?: string,
    children?: React.ReactNode
}

export const ScreenContainer: React.FC<IScreenContainer> = ({
    title = 'Screen',
    children
}) => {
    const { isAuth } = useAuth();

    if (isAuth()) useSocket();

    const { getUser } = useUser();
    const { getCurrencies } = useWallet();

    useEffect(() => {
        if (!isAuth()) return;

        getUser();
        getCurrencies();
    }, []);


    return (
        <>
            <Helmet>
                <title>{title} | Sabbank</title>
            </Helmet>
            <div className='d-flex flex-column min-vh-100'>
                <Navbar />                
                {isAuth() ? (
                    <Container className={cn(styles.containerLayout)}>
                        <div className="row">
                            <aside className={cn(styles.aside, "col-md-4")}>
                                <Balance />
                                <WalletList />
                                <CurrencyList />
                            </aside>
                            <main className={cn(styles.main, "col-md-8")}>
                                {children} 
                            </main>
                        </div>
                    </Container>
                ) : (
                    <Container className={cn(styles.containerLayout)}>
                        {children} 
                    </Container>
                )}
                <Footer />
            </div>
        </>
    )
}
