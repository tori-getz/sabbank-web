
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

import {
    CurrencyRadio,
    DepositAgreement
 } from '@components';

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

    const [ agreementVisible, setAgreementVisible ] = useState<boolean>(false);

    const currencyAssets: Array<string> = currencies.map(c => c.asset);
    const filteredCryptos = cryptos.filter(c => currencyAssets.includes(c.asset));

    const onAgree = () => {
        navigate('/deposit/calculate', {
            state: {
                currency,
                period,
                percentageKey
            }
        });
    }

    useEffect(() => {
        getInfo();
    }, []);

    useEffect(() => {
        if (!isEmpty(currencies)) {
            // @ts-ignore
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
                                    {currencies.map((crypto, key: number) => (
                                        <CurrencyRadio 
                                            // @ts-ignore
                                            item={crypto}
                                            key={key}
                                            percentageKey={percentageKey}
                                            active={crypto.id === currency?.id} 
                                            // @ts-ignore
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
                                        key={key}
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
                            onClick={() => setAgreementVisible(true)}
                            className={cn(
                                styles.next,
                                'mt-4'
                            )}
                            label={t('Next')}
                        />
                    </div>
                </CardContent>
            </Card>
            <DepositAgreement
                visible={agreementVisible}
                onClose={() => setAgreementVisible(false)}
                onAgree={onAgree}
            />
        </ScreenContainer>
    )
}
