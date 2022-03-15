
import React, { useState, useEffect } from 'react';

import { useTranslation, useDeposit  } from '@hooks';

import { ScreenContainer } from '@containers';

import { GoBack, DepositListItem, Details, Spinner, Button } from '@components/ui';

import { useNavigate, useParams } from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism';

import type {
    IDepositPeriod,
    IDepositCurrency
} from '@typing';

import { moneyAmountFormatter } from '@utils';

import { format as formatDate } from 'date-fns';

import styles from './DepositInfoScreen.module.sass';
import cn from 'classnames';

interface IDepositInfoScreen {};

export const DepositInfoScreen: React.FC<IDepositInfoScreen> = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { getDepositHistory } = useDeposit();

    const { t, language } = useTranslation();

    const [ loading, setLoading ] = useState<boolean>(true);

    const [ onHold, setOnHold ] = useState<boolean>(false);
    const [ depositId, setDepositId ] = useState<string>('');
    const [ totalIncome, setTotalIncome ] = useState<number>(0);
    const [ depositPeriod, setDepositPeriod ] = useState<IDepositPeriod>();
    const [ currency, setCurrency ] = useState<IDepositCurrency>();
    const [ createdAt, setCreatedAt ] = useState<string>('');

    const getHistory = async () => {
        try {
            const { id: depositId, total_income, created_deposit, data: { currency, deposit_period }, on_hold } = await getDepositHistory({ id });

            setOnHold(on_hold);
            setDepositId(depositId);
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
                        <div className='d-flex justify-content-end mt-4'>
                            <div
                                className={cn(
                                    styles.withdraw,
                                    { [styles.withdrawDisabled]: onHold }
                                )}
                                onClick={!onHold && (() => navigate('/deposit/withdraw', { state: { id: depositId } }))}
                            >
                                {t('Withdraw')}
                            </div>
                            <Button
                                label={t('Top up')}
                                onClick={() => navigate('/deposit/calculate', {
                                    state: {
                                        currency,
                                        period: {
                                            depositPeriod,
                                            percentage: currency.percentage
                                        },
                                        depositId
                                    }
                                })}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
