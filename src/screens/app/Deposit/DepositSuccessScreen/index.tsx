
import React from 'react';

import { useTranslation } from '@hooks';

import { ScreenContainer } from '@containers';

import {
    GoBack,
    Spinner
} from '@components/ui';

import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism';

interface IDepositSuccessScreen {};

export const DepositSuccessScreen: React.FC<IDepositSuccessScreen> = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const renderInfo = () => {
        return <Spinner />
    }

    return (
        <ScreenContainer title={t('Deposit')}>
            <GoBack
                onClick={() => navigate('/deposit')}
            />
            <h2>{t('Deposit')}</h2>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        {renderInfo()}
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
