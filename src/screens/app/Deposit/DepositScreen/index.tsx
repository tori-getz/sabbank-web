
import React, { useEffect } from 'react';

import { useTranslation, useDeposit } from '@hooks';

import { ScreenContainer } from '@containers';

import {
    TotalEarnings,
    DepositGroup
} from '@components';

import { Button } from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';

import type {
    IDepositGroup
} from '@typing';

interface IDepositScreen {};

export const DepositScreen: React.FC<IDepositScreen> = () => {
    const { t } = useTranslation();

    const { depositList, getDeposits } = useDeposit();

    useEffect(() => {
        getDeposits();
    }, []);

    return (
        <ScreenContainer title={t('Deposit')}>
            <h2>{t('Deposit')}</h2>
            <div className='d-flex mb-5'>
                <TotalEarnings />
                <Button
                    label={t('Open deposit')}
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
