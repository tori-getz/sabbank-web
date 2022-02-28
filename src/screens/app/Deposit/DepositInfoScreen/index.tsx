
import React, { useState, useEffect } from 'react';

import { useTranslation, useDeposit  } from '@hooks';

import { ScreenContainer } from '@containers';

import { GoBack, DepositListItem, Details, Spinner } from '@components/ui';

import { useNavigate, useParams } from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism';

import type {
    IDepositPeriod,
    IDepositCurrency
} from '@typing';

import { moneyAmountFormatter } from '@utils';

import { format as formatDate } from 'date-fns';

interface IDepositInfoScreen {};

export const DepositInfoScreen: React.FC<IDepositInfoScreen> = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { getDepositHistory } = useDeposit();

    const { t, language } = useTranslation();

    const [ loading, setLoading ] = useState<boolean>(true);

    const [ totalIncome, setTotalIncome ] = useState<number>(0);
    const [ depositPeriod, setDepositPeriod ] = useState<IDepositPeriod>();
    const [ currency, setCurrency ] = useState<IDepositCurrency>();
    const [ createdAt, setCreatedAt ] = useState<string>('');

    const getHistory = async () => {
        try {
            const { total_income, created_deposit, data: { currency, deposit_period } } = await getDepositHistory({ id });

            setTotalIncome(total_income);
            setDepositPeriod(deposit_period);
            setCurrency(currency);
            setCreatedAt(created_deposit);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getHistory();
    }, []);

    if (loading) {
        return (
            <ScreenContainer>
                <Spinner />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer>
            <GoBack
                onClick={() => navigate(-1)}
            />
            <h2>{depositPeriod[`name_${language}`]} ({currency.percentage}%)</h2>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        <DepositListItem
                            id={currency.id}
                            is_active={true}
                            amount={currency.amount}
                            asset={currency.asset}
                            name={currency.name}
                            disabled
                        />
                        <Details
                            items={[
                                {
                                    name: t('Total earnings'),
                                    value: `${moneyAmountFormatter(totalIncome, 8)} ${currency.asset.toUpperCase()}`
                                },
                                {
                                    name: t('Opening a deposit'),
                                    value: formatDate(new Date(createdAt), 'dd.MM.yyyy')
                                }
                            ]}
                        />
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
