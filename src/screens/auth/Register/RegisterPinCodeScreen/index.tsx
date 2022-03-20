
import React, { useState } from 'react';

import { ScreenContainer } from '@containers';

import {
    useTranslation
} from '@hooks';

import {
    useLocation
} from 'react-router-dom';

interface ILocationState {
    email: string
}

interface IRegisterPinCodeScreen {};

export const RegisterPinCodeScreen: React.FC<IRegisterPinCodeScreen> = () => {
    const { t } = useTranslation();

    const location = useLocation();
    const { email } = location.state as ILocationState;

    const [ code, setCode ] = useState<string>('');

    return (
        <ScreenContainer title={t('Sign up')}>
            pin code screen
        </ScreenContainer>
    )
}
