
import React, { useState, useEffect, useMemo } from 'react';

import {
    useTranslation,
    useWallet
} from '@hooks';

import {
    ScreenContainer
} from '@containers';

import {
    GoBack,
    Label,
    TokenSelect,
    Spinner,
    CurrencyInput,
    Button
} from '@components/ui';

import {
    ExchangeHistory
} from '@components';

import { Card, CardContent } from 'ui-neumorphism';

import { useNavigate } from 'react-router-dom';

import type {
    IWalletCurrency
} from '@typing';

import styles from './ExchangeScreen.module.sass';

import { isEmpty } from 'lodash';

import { moneyAmountFormatter } from '@utils';

interface IExchangeScreen {};

export const ExchangeScreen: React.FC<IExchangeScreen> = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const {
        currencies,
        getExchangeRate,
        exchange
    } = useWallet();

    const [ fromCrypto, setFromCrypto ] = useState<IWalletCurrency>(null);
    const [ toCrypto, setToCrypto ] = useState<IWalletCurrency>(null);

    const [ rate, setRate ] = useState<string>('0');

    const [ amount, setAmount ] = useState<string>('');

    const fromItems = useMemo(() => currencies.filter(c => toCrypto?.id !== c.id), [toCrypto]);
    const toItems = useMemo(() => currencies.filter(c => fromCrypto?.id !== c.id), [fromCrypto]);

    const [ preload, setPreload ] = useState<boolean>(true);

    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        if (isEmpty(currencies)) return;

        setFromCrypto(currencies.find(c => c.asset === 'btc'));
        setToCrypto(currencies.find(c => c.asset === 'usdt'));

        setPreload(false);
    }, [currencies]);

    useEffect(() => {
        (async () => {
            if (preload) return;

            const { result } = await getExchangeRate({
                asset_from: fromCrypto.asset,
                asset_to: toCrypto.asset,
                amount: 1
            });

            setRate(moneyAmountFormatter(result, 8));
        })();
    }, [fromCrypto, toCrypto]);

    const onSubmit = async () => {
        try {
            setLoading(true);

            await exchange({
                asset_from: fromCrypto.asset,
                asset_to: toCrypto.asset,
                amount: Number(amount)
            })

            navigate('/dashboard')
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    if (preload) {
        return (
            <ScreenContainer title={t('Exchange')}>
                <GoBack onClick={() => navigate('/dashboard')} />
                <Spinner />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer title={t('Exchange')}>
            <GoBack onClick={() => navigate('/dashboard')} />
            <h3>{t('Exchange')}</h3>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        <h4>{t('Cryptocurrency')}</h4>
                        <div className={styles.selects}>
                            <div className={styles.select}>
                                <Label>{t('From wallet')}</Label>
                                <TokenSelect
                                    defaultValue={fromCrypto}
                                    items={fromItems}
                                    onChange={setFromCrypto}
                                />
                            </div>
                            <div className={styles.separator} />
                            <div className={styles.select}>
                                <Label>{t('To wallet')}</Label>
                                <TokenSelect
                                    defaultValue={toCrypto}
                                    items={toItems}
                                    onChange={setToCrypto}
                                />
                            </div>
                        </div>
                        <CurrencyInput
                            labeled
                            assetFrom={fromCrypto.asset}
                            assetTo={toCrypto.asset}
                            value={amount}
                            onChange={setAmount}
                        />
                        <Label>{`1 ${fromCrypto.asset.toUpperCase()} = ${rate} ${toCrypto.asset.toUpperCase()}`}</Label>
                        <Button
                            className='mt-4'
                            disabled={!amount || Number(amount) > Number(fromCrypto.balance) || loading}
                            label={t('Exchange')}
                            onClick={onSubmit}
                            loading={loading}
                        />
                    </div>
                </CardContent>
            </Card>
            {/* <ExchangeHistory /> */}
        </ScreenContainer>
    )
}
