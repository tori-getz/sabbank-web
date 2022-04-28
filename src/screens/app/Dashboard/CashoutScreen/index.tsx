
import React, { useState, useEffect } from 'react';

import {
    ScreenContainer
} from '@containers';

import {
    GoBack,
    Label,
    TokenSelect,
    CurrencyInput,
    Spinner,
    Details,
    TabButton,
    TextInput,
    Button
} from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';

import { useNavigate } from 'react-router-dom';

import {
    useTranslation,
    useWallet
} from '@hooks';

import type {
    IWalletCurrency
} from '@typing';

import { isEmpty } from 'lodash';

import styles from './CashoutScreen.module.sass';
import cn from 'classnames';

interface ICashoutScreen {};

export const CashoutScreen: React.FC<ICashoutScreen> = () => {
    const { t } = useTranslation();
    
    const navigate = useNavigate();

    const {
        currencies
    } = useWallet();

    const withdrawMethods: Array<string> = [ 'sepa', 'swift' ];

    const [ selectedCurrency, setSelectedCurrency ] = useState<IWalletCurrency>();
    const [ amount, setAmount ] = useState<string>('');
    const [ withdrawMethod, setWithdrawMethod ] = useState<string>(withdrawMethods[0]);

    useEffect(() => {
        if (isEmpty(currencies)) return;

        setSelectedCurrency(currencies[0]);
    }, [currencies]);

    if (!selectedCurrency) {
        return (
            <ScreenContainer title={t('Cashout')}>
                <GoBack onClick={() => navigate('/dashboard')} />
                <Spinner />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer title={t('Cash out')}>
            <GoBack onClick={() => navigate('/dashboard')} />
            <h3>{t('Cash out')}</h3>
            <Card>
                <CardContent>
                    <div className='p-md-4 px-2 py-3'>
                        <h4>{t('Cryptocurrency')}</h4>
                        <Label>{t('Choose a wallet to withdraw funds')}</Label>
                        <TokenSelect
                            defaultValue={selectedCurrency}
                            items={currencies}
                            onChange={setSelectedCurrency}
                        />
                        <h4 className='mt-4'>{t('Amount')}</h4>
                        <CurrencyInput
                            value={amount}
                            onChange={setAmount}
                            assetFrom={selectedCurrency.asset || 'btc'}
                            assetTo={selectedCurrency.asset || 'btc'}
                        />
                        <Details
                            items={[
                                {
                                    name: t('Comission'),
                                    value: `0 ${selectedCurrency.asset.toUpperCase()}`
                                },
                                {
                                    name: t('Total'),
                                    value: `${amount ? amount : '0'} ${selectedCurrency.asset.toUpperCase()}`
                                }
                            ]}
                        />
                        <div className={cn(styles.withdrawMethods, 'mt-4')}>
                            {withdrawMethods.map((method: string, key: number) => (
                                <TabButton
                                    key={key}
                                    active={method === withdrawMethod}
                                    onClick={() => setWithdrawMethod(method)}
                                    label={method.toUpperCase()}
                                />
                            ))}
                        </div>
                        <Label className='mt-4'>ФИО получателя/Компания</Label>
                        <TextInput />
                        <Label className='mt-4'>Счёт получателя (IBAN)</Label>
                        <TextInput />
                        <Label className='mt-4'>Банк</Label>
                        <TextInput />
                        {withdrawMethod === 'swift' && (
                            <>
                                <Label className='mt-4'>SWIFT банка</Label>
                                <TextInput />
                                <Label className='mt-4'>Назначение средств</Label>
                                <TextInput />                
                            </>
                        )}
                        <Button
                            className={styles.button}
                            label={t('Cash out')}
                        />
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}

