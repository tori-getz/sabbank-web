
import React from 'react';

import { ScreenContainer } from '@containers';
import { LoginForm } from '@components';

import { useTranslation } from '@hooks';

interface ILoginScreen {};

export const LoginScreen: React.FC<ILoginScreen> = () => {
    const { t } = useTranslation();

    return (
        <ScreenContainer title={t('Sign in')}>
            <LoginForm />
        </ScreenContainer>
    );
}
