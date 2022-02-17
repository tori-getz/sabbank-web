
import React, { useEffect } from 'react';

import { Button } from 'ui-neumorphism';
import { Container } from 'react-bootstrap';

import { useSocket, useUser, useWallet, useTranslation } from '@hooks';
import cn from 'classnames';

import { ScreenContainer } from '@containers';
import { Navbar, Footer } from '@components/ui'
import { Balance, CurrencyList, WalletList } from '@components';
import styles from './DashboardScreen.module.sass';

interface IDashboardScreen {};

export const DashboardScreen: React.FC<IDashboardScreen> = () => {
    useSocket();

    const { t } = useTranslation();

    const { getUser } = useUser();
    const { getCurrencies } = useWallet();

    useEffect(() => {
        getUser();
        getCurrencies();
    }, []);

    return (
        <ScreenContainer title={t('Main')}>
            <h1>BODY</h1>
        </ScreenContainer>
    )
}
