
import React from 'react';

import { useTranslation } from '@hooks';
import { useNavigate } from 'react-router-dom';

import { ScreenContainer } from '@containers';

import {
    GoBack
} from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';

interface ICreditRepaymentScreen {};

export const CreditRepaymentScreen: React.FC<ICreditRepaymentScreen> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <ScreenContainer title={t('Loan repayment')}>
            <GoBack onClick={() => navigate(-1)} />
            <h2>{t('Loan repayment')}</h2>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        repayment
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    );
}
