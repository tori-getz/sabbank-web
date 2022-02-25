
import React, { useEffect, useState } from 'react';

import type {
    IDepositSettingCurrency,
    IDepositSettingCurrencyPeriod
} from '@typing';

import { ScreenContainer } from '@containers';

import { useTranslation, useDeposit, useWallet } from '@hooks';

import {
    Divider,
    GoBack,
    DepositPeriodItem,
    Label, 
    Button
} from '@components/ui';

import { CurrencyRadio } from '@components';

import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism'

import { isEmpty } from 'lodash';

import styles from './NewDepositScreen.module.sass';
import cn from 'classnames';

interface INewDepositScreen {};

export const NewDepositScreen: React.FC<INewDepositScreen> = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const { currencies, getInfo } = useDeposit();
    const { currencies: cryptos } = useWallet();

    const [ percentageKey, setPercentageKey ] = useState<number>(0);
    const [ currency, setCurrency ] = useState<IDepositSettingCurrency>(null);
    const [ period, setPeriod ] = useState<IDepositSettingCurrencyPeriod>(null);

    const currencyAssets: Array<string> = currencies.map(c => c.asset);
    const filteredCryptos = cryptos.filter(c => currencyAssets.includes(c.asset));

    useEffect(() => {
        getInfo();
    }, []);

    useEffect(() => {
        if (!isEmpty(currencies)) {
            setCurrency(currencies[0]);
        }
    }, [currencies]);

    return (
        <ScreenContainer title={t('Open deposit')}>
            <GoBack onClick={() => navigate(-1)} />
            <h2>Вклад</h2>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        {!isEmpty(currencies) && (
                            <div>
                                <h3>{t('Cryptocurrency')}</h3>
                                <Label>{t('Choose a cryptocurrency to invest to earn money')}</Label>
                                <div className={cn(
                                    styles.currencies,
                                    'd-flex'
                                )}>
                                    {currencies.map((crypto) => (
                                        <CurrencyRadio 
                                            item={crypto}
                                            percentageKey={percentageKey}
                                            active={crypto.id === currency?.id} 
                                            onClick={() => setCurrency(crypto)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <Divider className='m-4' />
                        {!isEmpty(currency) && (
                            <div>
                                <h3>{t('Term')}</h3>
                                <Label>{t('Select the period for investment after which the principal amount and profit will be in the currency of your choice')}</Label>
                                {currency.data.map((d, key: number) => (
                                    <DepositPeriodItem
                                        item={d}
                                        active={d.depositPeriod.id === period?.depositPeriod?.id}
                                        onClick={() => {
                                            setPeriod(d);
                                            setPercentageKey(key);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                        <Button
                            disabled={!period}
                            className={cn(
                                styles.next,
                                'mt-4'
                            )}
                            label={t('Next')}
                        />
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
