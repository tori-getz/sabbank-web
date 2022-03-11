
import React from 'react';

import { ScreenContainer } from '@containers';

import {
    useTranslation
} from '@hooks';

interface IRegisterPinCodeScreen {};

export const RegisterPinCodeScreen: React.FC<IRegisterPinCodeScreen> = () => {
    const { t } = useTranslation();

    return (
        <ScreenContainer title={t('Sign up')}>
            pin code screen
        </ScreenContainer>
    )
}
