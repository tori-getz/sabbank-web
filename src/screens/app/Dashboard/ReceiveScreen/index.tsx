
import React, { useState } from 'react';

import {
    ScreenContainer
} from '@containers';

import {
    GoBack,
    Label,
    TokenSelect,
    CurrencyInput,
    Button
} from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';

import {
    useTranslation,
    useWallet
} from '@hooks';

import { useNavigate } from 'react-router-dom';

import type { IWalletCurrency } from '@typing';

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
                    <div className='p-4'>
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
                        <div className='mt-4 d-flex'>
                            <div>
                                <Button
                                    label={t('Next')}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
