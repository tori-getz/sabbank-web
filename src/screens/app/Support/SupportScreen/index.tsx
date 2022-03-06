
import React from 'react';

import { ScreenContainer } from '@containers';

import {
    GoBack,
    SettingsButton
} from '@components/ui';

import { useTranslation } from '@hooks';
import { useNavigate } from 'react-router-dom';

interface ISupportScreen {};

export const SupportScreen: React.FC<ISupportScreen> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <ScreenContainer title={t('FAQ and support')}>
            <GoBack onClick={() => navigate(-1)}/>
            <h3>{t('FAQ and support')}</h3>
            <SettingsButton
                title='FAQ'
                description={t('Frequently asked questions')}
                onClick={() => navigate('/support/faq')}
            />
        </ScreenContainer>
    )
}
