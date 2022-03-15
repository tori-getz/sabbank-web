
import React, { useState, useEffect } from 'react';

import { ScreenContainer } from '@containers'

import {
    useTranslation,
    useDeposit
} from '@hooks';

import { useLocation } from 'react-router-dom';

import { Spinner } from '@components/ui';
import { Card, CardContent } from 'ui-neumorphism';

import type {
    IDepositWithdrawInfo
} from '@typing';

interface ILocationState {
    id: string
}

interface IDepositWithdrawScreen {};

export const DepositWithdrawScreen: React.FC<IDepositWithdrawScreen> = () => {
    const { t } = useTranslation();

    const location = useLocation();

    const { getWithdrawInfo } = useDeposit();

    const { id } = location.state as ILocationState;

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ info, setInfo ] = useState<IDepositWithdrawInfo>();

    const getData = async () => {
        try {
            setLoading(true);

            const withdrawInfo = await getWithdrawInfo({ id });

            setInfo(withdrawInfo);
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
            <ScreenContainer title={t('Loading')}>
                <Spinner />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer title={`${t('Withdraw')} ${info.asset.ticker.toUpperCase()}`}>
            <h2>{t('Withdraw')} {info.asset.ticker.toUpperCase()}</h2>
            <Card>
                <CardContent>
                    
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
