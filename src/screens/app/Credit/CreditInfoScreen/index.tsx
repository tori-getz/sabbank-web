
import React, { useState, useEffect } from 'react';

import { useTranslation, useCredit } from '@hooks';

import { ScreenContainer } from '@containers';

import { useNavigate, useParams } from 'react-router-dom';

import {
    GoBack,
    Spinner,
    Details
} from '@components/ui';

import { moneyAmountFormatter } from '@utils';
import { format as formatDate } from 'date-fns';

import type {
    ICredit
} from '@typing';
import { Card, CardContent } from 'ui-neumorphism';

interface ICreditInfoScreen {};

interface ITable {
    name: string
    value: string
};

export const CreditinfoScreen: React.FC<ICreditInfoScreen> = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const { id } = useParams();

    const { getCredit } = useCredit();

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ credit, setCredit ] = useState<ICredit>(null);

    const [ table, setTable ] = useState<ITable[]>([]);

    const getData = async () => {
        try {
            const loadedCredit = await getCredit({ id });

            setCredit(loadedCredit);
            setLoading(false);
        } catch (e) {
            console.error(e);
            navigate('/credit');
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
            <h2>{t(`creditStatus__${credit.status}`)} {t('Credit').toLowerCase()}</h2>  
            <Card>
                <CardContent>
                    <div className='p-4'>
                        <h4>{t('Credit')} №{credit.number}</h4>
                        <Details
                            items={table}
                        />
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
