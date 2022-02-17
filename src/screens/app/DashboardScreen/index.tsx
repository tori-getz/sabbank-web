
import React from 'react';

import { useSocket, useTranslation } from '@hooks';

import { ScreenContainer } from '@containers';

interface IDashboardScreen {};

export const DashboardScreen: React.FC<IDashboardScreen> = () => {
    useSocket();

    const { t } = useTranslation();

    return (
        <ScreenContainer title={t('Main')}>
            <h1>BODY</h1>
        </ScreenContainer>
    )
}
