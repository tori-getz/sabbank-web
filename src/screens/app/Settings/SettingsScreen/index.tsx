
import React from 'react';

import { ScreenContainer } from '@containers';

import { useTranslation } from '@hooks';

interface ISettingsScreen {};

export const SettingsScreen: React.FC<ISettingsScreen> = () => {
    const { t } = useTranslation();

    return (
        <ScreenContainer title={t('Settings')}>
            <h3>{t('Settings')}</h3>
        </ScreenContainer>
    )
}
