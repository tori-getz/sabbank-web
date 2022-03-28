
import React, { useState, useEffect } from 'react';

import {
    ScreenContainer
} from '@containers';

import {
    GoBack,
    Label,
    TokenSelect,
    CurrencyInput,
    Button,
    TextInput,
    Spinner,
    ErrorLabel
} from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';

import {
    useTranslation,
    useWallet
} from '@hooks';

import { useNavigate } from 'react-router-dom';

import type { IWalletCurrency } from '@typing';

import { isEmpty, debounce } from 'lodash';

interface ITransferScreen {};

export const TransferScreen: React.FC<ITransferScreen> = () => {
    const { t } = useTranslation();
    
    const navigate = useNavigate();

    const { 
        currencies,
        findWallet
     } = useWallet();

    const [ currency, setCurrency ] = useState<IWalletCurrency>();
    const [ amount, setAmount ] = useState<string>('');
    const [ address, setAddress ] = useState<string>('');
    const [ addressValid, setAddressValid ] = useState<boolean>(true);

    const findWalletDebounced = debounce(async () => {
        const valid = await findWallet({
            address,
            network: currency?.network
        });

        setAddressValid(valid);
    }, 250);

    useEffect(() => {
        if (!currency || !address) return;

        findWalletDebounced();
    }, [address]);

    useEffect(() => {
        if (isEmpty(currencies)) return;
        if (currency) return;

        setCurrency(currencies[0]);
    }, [currencies]);

    if (!currency) {
        return (
            <ScreenContainer title={t('Transfer')}>
                <Spinner />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer title={t('Transfer')}>
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
                        <h4 className='mt-5'>{t('Wallet address')}</h4>
                        <Label>{t('Enter wallet address')}</Label>
                        <TextInput
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                        {!addressValid && (
                            <ErrorLabel>{t('Enter wallet address')}</ErrorLabel>
                        )}
                        <div className='mt-4 d-flex align-end'>
                            <div className=''>
                                <Button
                                    disabled={!address || Number(amount) > currency?.balance}
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
