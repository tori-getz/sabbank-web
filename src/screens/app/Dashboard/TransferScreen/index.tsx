
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

interface ITransferScreen {};

export const TransferScreen: React.FC<ITransferScreen> = () => {
    const { t } = useTranslation();
    
    const navigate = useNavigate();

    const { currencies } = useWallet();

    const [ currency, setCurrency ] = useState<IWalletCurrency>(currencies[0]);
    const [ amount, setAmount ] = useState<string>('');

    return (
        <ScreenContainer>
            <GoBack onClick={() => navigate('/dashboard')}/>
            <h2>{t('Transfer')}</h2>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        <h4>{t('Cryptocurrency')}</h4>
                        <Label>{t('Choose a cryptocurrency for transfer')}</Label>
                        <TokenSelect
                            defaultValue={currency}
                            onChange={setCurrency}
                            items={currencies}
                        />
                        <Label className='mt-4'>{t('Transfer amount')}</Label>
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
    );
}
