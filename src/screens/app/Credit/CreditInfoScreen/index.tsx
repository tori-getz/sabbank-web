
import React, { useState, useEffect } from 'react';

import { useTranslation, useCredit } from '@hooks';

import { ScreenContainer } from '@containers';

import { useNavigate, useParams } from 'react-router-dom';

import {
    GoBack,
    Spinner,
    Details,
    CurrencyAmount,
    Button
} from '@components/ui';

import {
    CreditLTV,
    IncreaseCollateral
} from '@components';

import { moneyAmountFormatter } from '@utils';
import { format as formatDate } from 'date-fns';

import type {
    ICredit
} from '@typing';

import { Card, CardContent } from 'ui-neumorphism';

import styles from './CreditinfoScreen.module.sass';

interface ICreditInfoScreen {};

interface ITable {
    name: string
    value: string
};

export const CreditinfoScreen: React.FC<ICreditInfoScreen> = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const { id } = useParams();

    const {
        getCredit,
        increaseCollateral
    } = useCredit();

    const [ increaseVisible, setIncreaseVisible ] = useState<boolean>(false);
    const [ increaseLoading, setIncreaseLoading ] = useState<boolean>(false);

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ credit, setCredit ] = useState<ICredit>(null);

    const [ table, setTable ] = useState<ITable[]>([]);

    const getData = async () => {
        try {
            setLoading(true);

            const loadedCredit = await getCredit({ id });

            setCredit(loadedCredit);
            setLoading(false);
        } catch (e) {
            console.error(e);
            navigate('/credit');
        }
    }

    const onIncreaseAgree = async (amount: number) => {
        try {
            setIncreaseLoading(true);

            const loadedCredit = await increaseCollateral({
                id: credit.id,
                amount
            });

            setCredit(loadedCredit);
        } catch (e) {
            console.error(e);
        } finally {
            setIncreaseLoading(false);
            setIncreaseVisible(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (!credit) return;

        setTable([
            {
                name: t('Loan amount'),
                value: `${moneyAmountFormatter(credit.amount, 8)} USDT`
            },
            {
                name: t('DepositAmount'),
                value: `${moneyAmountFormatter(credit.deposit, 8)} ${credit.deposit_currency.toUpperCase()}`
            },
            {
                name: t('Comission'),
                value: `${moneyAmountFormatter(credit.comission_amount, 8)} ${credit.comission_currency.toUpperCase()}`
            },
            {
                name: t('Interest rate'),
                value: `${credit.rate}%`
            },
            {
                name: t('Date of issue'),
                value: formatDate(new Date(credit.created_ts), 'dd.MM.yyyy')
            },
            {
                name: t('Maturity date'),
                value: formatDate(new Date(credit.finish_payment), 'dd.MM.yyyy')
            },
            {
                name: t('Loan/collateral ratio (LTV)'),
                value: `${credit.ltv}%`
            },
            {
                name: t('Commission payment method'),
                value: credit.comission_currency.toUpperCase()
            }
        ]);
    }, [credit]);

    const isClosed = () => credit?.status === 'closed' || credit?.status === 'finished';

    if (loading) {
        return (
            <ScreenContainer title={t('Loading')}>
                <Spinner />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer title={`${t('Credit')} №${credit.number}`}>
            <GoBack onClick={() => navigate('/credit')}/>
            <div className="widgetTitleL">{t(`creditStatus__${credit.status}`)} {t('Credit').toLowerCase()}</div>  
            <Card>
                <CardContent>
                    <div className='p-md-4 pt-4'>
                        <div className='d-flex justify-content-between'>
                            <h4>{t('Credit')} №{credit.number}</h4>
                            {!isClosed() && (
                                <CreditLTV
                                    ltv={credit.ltv}
                                    ltvStatus={credit.ltv_status}
                                    ltvOriginal={credit.ltv_original}
                                />
                            )}
                        </div>
                        {!isClosed() && (
                            <>
                                <div className="widgetTitle pt-3">{t('Loan amount')}</div>
                                <CurrencyAmount
                                    amount={moneyAmountFormatter(credit.amount, 8)}
                                    asset='usdt'
                                >
                                    <Button
                                        label={t('Increase the deposit')}
                                        onClick={() => setIncreaseVisible(true)}    
                                    />
                                </CurrencyAmount>
                                <div className="widgetTitle pt-3">{t('Remaining amount')}</div>
                                <CurrencyAmount
                                    amount={moneyAmountFormatter(credit.close_price, 8)}
                                    asset='usdt'
                                />
                            </>
                        )}
                        <Details
                            items={table}
                        />
                    </div>
                </CardContent>
            </Card>
            {!isClosed() && (
                <IncreaseCollateral
                    visible={increaseVisible}
                    onClose={() => setIncreaseVisible(false)}
                    asset={credit.deposit_currency}
                    loading={increaseLoading}
                    onAgree={onIncreaseAgree}
                />
            )}
        </ScreenContainer>
    )
}
