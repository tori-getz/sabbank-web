
import React from 'react';

import { ScreenContainer } from '@containers';

import {
    useTranslation,
    useWallet
} from '@hooks';

import {
    useNavigate
} from 'react-router-dom';

import {
    GoBack
} from '@components/ui';

import { WalletButton } from '@components';

import type {
    ICurrency
} from '@typing';

import styles from './WalletListScreen.module.sass';

interface IWalletListScreen {};

export const WalletListScreen: React.FC<IWalletListScreen> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { currencies } = useWallet();

    return (
        <ScreenContainer title={t('Wallets')}>
            <GoBack onClick={() => navigate(-1)} />
            <h2>{t('Wallets')}</h2>
            <div className={styles.list}>
                {currencies.map((currency: ICurrency, key: number) => (
                    <WalletButton
                        className={styles.listItem}
                        item={currency}
                        key={key}
                        onClick={() => navigate(`/wallet/${currency.id}`)}
                    />
                ))}
            </div>
        </ScreenContainer>
    )
}
