
import React, { useEffect } from 'react';

import { Button } from 'ui-neumorphism';
import { Container } from 'react-bootstrap';

import { useSocket, useProfile, useWallet } from '@hooks';
import cn from 'classnames';

import { ScreenContainer } from '@containers';
import { Navbar, Footer } from '@components/ui'
import { Balance, CurrencyList, WalletList } from '@components';
import styles from './DashboardScreen.module.sass';

interface IDashboardScreen {};

export const DashboardScreen: React.FC<IDashboardScreen> = () => {
    useSocket();

    const { getUser } = useProfile();
    const { getCurrencies } = useWallet();

    useEffect(() => {
        getUser();
        getCurrencies();
    }, []);

    return (
        <ScreenContainer title='Dashboard'>
            <h1>BODY</h1>
        </ScreenContainer>
    )
}
