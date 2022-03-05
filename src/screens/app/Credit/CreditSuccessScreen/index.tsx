
import React, { useState, useEffect } from 'react';

import { ScreenContainer } from '@containers';

import {
    Icon,
    Spinner,
    Details,
    Button
} from '@components/ui';

import type { ICredit } from '@typing';

import { useTranslation, useCredit } from '@hooks';
import { useParams, useNavigate } from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism';

import styles from './CreditSuccessScreen.module.sass';

import { moneyAmountFormatter } from '@utils';
import { format as formatDate } from 'date-fns';

interface ICreditSuccessScreen {};

interface IDetail {
    name: string
    value: string
}

export const CreditSuccessScreen: React.FC<ICreditSuccessScreen> = () => {
    const { t, language } = useTranslation();
    
    const navigate = useNavigate();
    const { id } = useParams();

    const { getCredit } = useCredit();

    const [ credit, setCredit ] = useState<ICredit>(null);
    const [ loading, setLoading ] = useState<boolean>(true);

    const [ details, setDetails ] = useState<IDetail[]>([]);

    useEffect(() => {
        if (!credit) return;

        setDetails([
            {
                name: t('Loan amount'),
                value: `${moneyAmountFormatter(credit.amount, 8)} USDT`
            },
            {
                name: t('Maturity date'),
                value: formatDate(new Date(credit.finish_payment), 'dd.MM.yyyy')
            },
            {
                name: t('Comission'),
                value: `${moneyAmountFormatter(credit.comission_amount, 8)} ${credit.comission_currency.toUpperCase()}`
            }
        ]);
    }, [credit, language]);

    const getData = async () => {
        try {
            const loadedCredit = await getCredit({ id });

            setCredit(loadedCredit);
        } catch (e) {
            console.error(e);
            navigate('/credit')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    if (loading) {
        return (
            <ScreenContainer>
                <Spinner />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer title={t('Credit')}>
            <h2>{t('Credit')}</h2>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        <div className={styles.header}>
                            <h3>{t('Success')}</h3>
                            <Icon name='done' />
                        </div>
                        <Details
                            items={details}
                        />
                        <Button
                            className={styles.done}
                            label={t('Done')}
                            onClick={() => navigate('/credit')}
                        />
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    );
}
