
import React from 'react';

import {
    ScreenContainer
} from '@containers';

import { GoBack } from '@components/ui';

import { useNavigate } from 'react-router-dom';

interface IExchangeScreen {};

export const ExchangeScreen: React.FC<IExchangeScreen> = () => {
    const navigate = useNavigate();

    return (
        <ScreenContainer>
            <GoBack onClick={() => navigate('/dashboard')} />
            <h3>Exchange</h3>
        </ScreenContainer>
    )
}
