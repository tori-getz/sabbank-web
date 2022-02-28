
import React, { useState } from 'react';

import { ScreenContainer } from '@containers';

import { useTranslation, useWallet } from '@hooks';

import {
    Divider, 
    GoBack,
    Label,
    TokenSelect,
    CurrencyInput,
    Button
} from '@components/ui';

import { CalculateDepositHeader } from '@components';

import { useNavigate, useLocation } from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism';

import {
    iCurrency,
    IDepositSettingCurrency,
    IDepositSettingCurrencyPeriod,
} from '@typing';

interface ILocationState {
    currency: IDepositSettingCurrency | iCurrency,
    period: IDepositSettingCurrencyPeriod
}

import styles from './CalculateDepositScreen.module.sass';
import cn from 'classnames';

interface ICalculateDepositScreen {};

export const CalculateDepositScreen: React.FC<ICalculateDepositScreen> = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();

    const { currency, period } = location.state as ILocationState;

    const { currencies } = useWallet();

    const [ selectedCurrency, setSelectedCurrency ] = useState<iCurrency>(currencies.find(c => c.asset === currency.asset));

    const [ amount, setAmount ] = useState<string>('');

    return (
        <ScreenContainer title={t('Deposit')}>
            <GoBack
                onClick={() => navigate(-1)}
            />
            <h3>{t('Deposit')}</h3>
            <CalculateDepositHeader
                currency={currency as IDepositSettingCurrency}
                period={period}
            />
            <Card>
                <CardContent>
                    <div className='p-2 pt-4 pb-4'>
                        <h4>{t('Cryptocurrency')}</h4>
                        <Label>{t('Wallet from which funds for the deposit will be credited')}</Label>
                        <TokenSelect
                            defaultValue={selectedCurrency}
                            items={currencies}
                            onChange={setSelectedCurrency}
                        />
                        <Divider className='mt-4 mb-4' />
                        <h4>{t('Deposit amount')}</h4>
                        <Label>{t('Enter the deposit amount')}</Label>
                        <CurrencyInput
                            value={amount}
                            onChange={setAmount}
                            assetFrom={selectedCurrency.asset}
                            // value={amount}
                        />
                        <Button
                            label={t('Next')}
                            className={cn(
                                styles.nextButton,
                                'mt-4'
                            )}
                        />
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
