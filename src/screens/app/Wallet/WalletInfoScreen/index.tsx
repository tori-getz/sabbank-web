
import React, { useState, useEffect } from 'react';

import { ScreenContainer } from '@containers';

import {
    useTranslation,
    useWallet
} from '@hooks';

import { useNavigate, useParams } from 'react-router-dom';

import {
    Spinner,
    GoBack
} from '@components/ui';

import {
    WalletInfo,
    WalletTransactionsHistory
} from '@components';

import { isEmpty } from 'lodash';

import type { IWalletCurrency } from '@typing';
import { Card, CardContent } from 'ui-neumorphism';

interface IWalletInfoScreen {};

export const WalletInfoScreen: React.FC<IWalletInfoScreen> = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const params = useParams();

    const { currencies } = useWallet();

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ crypto, setCrypto ] = useState<IWalletCurrency>();

    useEffect(() => {
        if (isEmpty(currencies)) return;
        
        const loadedCrypto = currencies.find(c => c.id === params.id);

        if (!loadedCrypto) return navigate('/wallet');

        setCrypto(loadedCrypto);
        setLoading(false);
    }, [currencies, params]);

    if (loading) {
        return (
            <ScreenContainer title={t('Loading')}>
                <Spinner />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer title={`${crypto.asset.toUpperCase()} ${t('Wallet')}`}>
            <GoBack onClick={() => navigate(-1)} />
            <h2>{crypto.asset.toUpperCase()} {t('Wallet')}</h2>
            <Card className='mb-5'>
                <CardContent>
                    <div className='p-4'>
                        <WalletInfo
                            crypto={crypto}
                        />
                    </div>
                </CardContent>
            </Card>
            <WalletTransactionsHistory asset={crypto.asset} />
        </ScreenContainer>
    )
}
