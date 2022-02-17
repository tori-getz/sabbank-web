
import React from 'react';

import { ScreenContainer } from '@containers';

import { useTranslation } from '@hooks';

interface ICreditScreen {};

export const CreditScreen: React.FC<ICreditScreen> = () => {
    const { t } = useTranslation();

    return (
        <ScreenContainer title={t('Credit')}>
            <h1>{t('Credit')}</h1>
        </ScreenContainer>
    )
}
