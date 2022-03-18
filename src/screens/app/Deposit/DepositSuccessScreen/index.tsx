
import React, { useState, useEffect } from 'react';

import { useTranslation, useDeposit } from '@hooks';

import { ScreenContainer } from '@containers';

import {
    GoBack,
    Spinner
} from '@components/ui';

import { useNavigate, useParams } from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism';

import { Icon, Button } from '@components/ui';

import styles from './DepositSuccessScreen.module.sass';

import { moneyAmountFormatter } from '@utils';
import { format as formatDate } from 'date-fns';

interface IDepositSuccessScreen {};

interface ITable {
    name: string
    value: string
}

export const DepositSuccessScreen: React.FC<IDepositSuccessScreen> = () => {
    const { t, language } = useTranslation();
    const { getDepositHistory } = useDeposit();

    const navigate = useNavigate();
    const { id } = useParams();

    const [ loading, setLoading ] = useState<boolean>(true);
    
    const [ table, setTable ] = useState<ITable[]>([]);

    const getData = async () => {
        try {
            const { created_deposit, data: { currency, deposit_period } } = await getDepositHistory({ id });

            setTable([
                {
                    name: t('Cryptocurrency'),
                    value: currency.name
                },
                {
                    name: t('Term'),
                    value: deposit_period[`name_${language}`]
                },
                {
                    name: t('Deposit amount'),
                    value: `${moneyAmountFormatter(currency.amount, 8)} ${currency.asset.toUpperCase()}`
                },
                {
                    name: t('Opening a deposit'),
                    value: formatDate(new Date(created_deposit), 'dd.MM.yyyy')
                }
            ]);
        } catch (e) {
            navigate('/deposit');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const renderInfo = () => {
        if (loading) return <Spinner />

        return (
            <div>
                <div className={styles.header}>
                    <h3>{t('Success')}!</h3>
                    <Icon name='done' />
                </div>
                {table.map(({ name, value }: ITable, key: number) => (
                    <div
                        key={key}
                        className={styles.tableRow}
                    >
                        <div className={styles.tableTitle}>{name}</div>
                        <div className={styles.tableValue}>{value}</div>
                    </div>
                ))}
                <Button
                    label={t('Done')}
                    className={styles.doneButton}
                    onClick={() => navigate('/deposit')}
                />
            </div>
        )
    }

    return (
        <ScreenContainer title={t('Deposit')}>
            <GoBack
                onClick={() => navigate('/deposit')}
            />
            <h2>{t('Deposit')}</h2>
            <Card>
                <CardContent>
                    <div className='p-md-4 pt-4'>
                        {renderInfo()}
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
