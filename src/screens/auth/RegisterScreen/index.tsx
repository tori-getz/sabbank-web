
import React from 'react';

import { ScreenContainer } from '@containers';

import { useTranslation } from '@hooks';

interface IRegisterScreen {};

export const RegisterScreen: React.FC<IRegisterScreen> = () => {
    const { t } = useTranslation();

    return (
        <ScreenContainer title={t('Sign up')}>
            <h1>{t('Sign up')}</h1>
        </ScreenContainer>
    )
}
