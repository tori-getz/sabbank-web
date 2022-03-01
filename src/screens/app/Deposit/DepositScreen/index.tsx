
import React, { useEffect, useState } from 'react';

import { useTranslation, useDeposit } from '@hooks';

import { ScreenContainer } from '@containers';

import {
    TotalEarnings,
    DepositGroup,
    DepositBanner
} from '@components';

import { Button, Spinner } from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';

import type {
    IDepositGroup
} from '@typing';

import { useNavigate } from 'react-router-dom';

import { isEmpty } from 'lodash';

interface IDepositScreen {};

export const DepositScreen: React.FC<IDepositScreen> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { depositList, getDeposits } = useDeposit();

    const [ loading, setLoading ] = useState<boolean>(true);

    const getDepositsList = async () => {
        try {
            await getDeposits();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getDepositsList();
    }, []);

    if (loading) {
        return (
            <ScreenContainer title={t('Deposit')}>
                <Spinner />
            </ScreenContainer>
        )
    }

    if (isEmpty(depositList)) {
        return (
            <ScreenContainer title={t('Deposit')}>
                <DepositBanner />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer title={t('Deposit')}>
            <h2>{t('Deposit')}</h2>
            <div className='d-flex mb-5'>
                <TotalEarnings />
                <Button
                    className='m-5'
                    label={t('Open deposit')}
                    onClick={() => navigate('/deposit/new')}
                />
            </div>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        {depositList.map((depositGroup: IDepositGroup, key: number) => (
                            <DepositGroup
                                group={depositGroup}
                                key={key}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
