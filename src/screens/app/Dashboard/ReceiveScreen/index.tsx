
import React, { useState } from 'react';

import {
    ScreenContainer
} from '@containers';

import {
    GoBack,
    Label,
    TokenSelect,
    CurrencyInput,
    TextInput,
    QRCode
} from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';

import {
    useTranslation,
    useWallet
} from '@hooks';

import { useNavigate } from 'react-router-dom';

import type { IWalletCurrency } from '@typing';

import styles from './ReceiveScreen.module.sass';

interface IReceiveScreen {};

export const ReceiveScreen: React.FC<IReceiveScreen> = () => {
    const { t } = useTranslation();

    const { currencies } = useWallet();

    const [ currency, setCurrency ] = useState<IWalletCurrency>(currencies[0]);
    const [ amount, setAmount ] = useState<string>('');

    const navigate = useNavigate();

    return (
        <ScreenContainer>
            <GoBack onClick={() => navigate('/dashboard')} />
            <h3>{t('Receive')}</h3>
            <Card>
                <CardContent>
                    <div className='p-md-4 px-2 py-3'>
                        <h4>{t('Cryptocurrency')}</h4>
                        <Label>{t('Choose a cryptocurrency for receive')}</Label>
                        <TokenSelect
                            defaultValue={currency}
                            onChange={setCurrency}
                            items={currencies}
                        />
                        <Label className='mt-4'>{t('Receive amount')}</Label>
                        <CurrencyInput
                            value={amount}
                            onChange={setAmount}
                            assetFrom={currency?.asset}
                        />
                    <div className={styles.addressWrapper}>
                            <div className={styles.qrcode}>
                                <Card>
                                    <CardContent>
                                        <QRCode
                                            text={currency?.address}
                                            size={180}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                            <div className={styles.address}>
                                <Label>{t('Copy wallet address to fund your account')}</Label>
                                <TextInput
                                    disabled
                                    value={currency?.address}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
