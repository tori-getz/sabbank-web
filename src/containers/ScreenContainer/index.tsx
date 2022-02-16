
import React from 'react';

import { Helmet } from 'react-helmet';

import cn from 'classnames';
import styles from './ScreenContainer.module.sass';

import { useAuth } from '@hooks';

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

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className='d-flex flex-column min-vh-100'>
                <Navbar />
                <Container className={cn(styles.containerLayout)}>
                    {isAuth() && (
                        <aside className={styles.aside}>
                            <Balance />
                            <WalletList />
                            <CurrencyList />
                        </aside>
                    )}
                    <main className={styles.main}>
                        {children} 
                    </main>
                </Container>
                <Footer />
            </div>
        </>
    )
}
