
import React, { useState, useEffect } from 'react';

import { ScreenContainer } from '@containers';

import styles from './CreditScreen.module.sass';

import { useTranslation, useCredit } from '@hooks';
import { useNavigate } from 'react-router-dom';

import {
    Button,
    Spinner,
    CreditItem
} from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';

import type { ICredit } from '@typing';

interface ICreditScreen {};

export const CreditScreen: React.FC<ICreditScreen> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [ loading, setLoading ] = useState<boolean>(true);

    const { creditsList, getCredits } = useCredit();

    const getData = async () => {
        try {
            await getCredits();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return (
            <ScreenContainer title={t('Credit')}>
                <Spinner />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer title={t('Credit')}>
            <div className={styles.header}>
                <h2>{t('Credit')}</h2>
                <Button
                    label={t('Apply new credit')}
                    onClick={() => navigate('/credit/apply')}
                />
            </div>
            <Card>
                <CardContent>
                    <div className='p-4 mt-4'>
                        <h3>{t('Executed loans')}</h3>
                        {creditsList.map((credit: ICredit, key: number) => (
                            <CreditItem
                                item={credit}
                                key={key}
                                onClick={() => navigate(`/credit/${credit.id}`)}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
