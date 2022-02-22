
import React from 'react';

import { ScreenContainer } from '@containers';

import { useTranslation } from '@hooks';

import { RegisterForm } from '@components';

interface IRegisterScreen {};

export const RegisterScreen: React.FC<IRegisterScreen> = () => {
    const { t } = useTranslation();

    return (
        <ScreenContainer title={t('Sign up')}>
            <RegisterForm />
        </ScreenContainer>
    )
}
