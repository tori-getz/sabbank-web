
import React, { useEffect } from 'react';

import { Helmet } from 'react-helmet';

import cn from 'classnames';
import styles from './ScreenContainer.module.sass';

import { useAuth, useProfile, useSocket, useWallet } from '@hooks';

import { Container } from 'react-bootstrap';

import { Navbar, Footer } from '@components/ui';
import { Balance, WalletList, CurrencyList } from '@components';

import { isEmpty } from 'lodash';

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

    const { getUser } = useProfile();

    const {
        getCurrencies,
        getTransactions,
        getRateData,
        currencies,
        walletsIsCreated,
        createWallets,
        getExchangeHistory
    } = useWallet();

    const checkWallets = async () => {
        if (walletsIsCreated()) return;

        await createWallets();
    }

    useEffect(() => {
        if (!isAuth()) return;

        getUser();
        getCurrencies();
        getRateData();
        getTransactions();
        getExchangeHistory();
    }, []);

    useEffect(() => {
        if (isEmpty(currencies)) return;

        checkWallets();
    }, [currencies]);

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
