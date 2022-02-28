
import React from 'react';

import { ScreenContainer } from '@containers';

import { useTranslation } from '@hooks';

import { GoBack, Label, TokenSelect } from '@components/ui';

import { CalculateDepositHeader } from '@components';

import { useNavigate, useLocation } from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism';

import {
    IDepositSettingCurrency,
    IDepositSettingCurrencyPeriod,
} from '@typing';

interface ILocationState {
    currency: IDepositSettingCurrency,
    period: IDepositSettingCurrencyPeriod
}

interface ICalculateDepositScreen {};

export const CalculateDepositScreen: React.FC<ICalculateDepositScreen> = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();

    const { currency, period } = location.state as ILocationState;
    return (
        <ScreenContainer title={t('Deposit')}>
            <GoBack
                onClick={() => navigate(-1)}
            />
            <h3>{t('Deposit')}</h3>
            <CalculateDepositHeader
                currency={currency}
                period={period}
            />
            <Card>
                <CardContent>
                    <div className='p-2 pt-4'>
                        <h4>{t('Cryptocurrency')}</h4>
                        <Label>{t('Wallet from which funds for the deposit will be credited')}</Label>
                    </div>
                    {/* <TokenSelect /> */}
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
