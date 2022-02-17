
import React from 'react';

import { useTranslation } from '@hooks';

import { ScreenContainer } from '@containers';

interface IDepositScreen {};

export const DepositScreen: React.FC<IDepositScreen> = () => {
    const { t } = useTranslation();

    return (
        <ScreenContainer title={t('Deposit')}>
            <h1>{t('Deposit')}</h1>
        </ScreenContainer>
    )
}
