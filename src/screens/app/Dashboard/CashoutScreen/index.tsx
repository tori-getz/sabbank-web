
import React from 'react';

import {
    ScreenContainer
} from '@containers';

import { GoBack } from '@components/ui';

import { useNavigate } from 'react-router-dom';

interface ICashoutScreen {};

export const CashoutScreen: React.FC<ICashoutScreen> = () => {
    const navigate = useNavigate();

    return (
        <ScreenContainer>
            <GoBack onClick={() => navigate('/dashboard')} />
            <h3>Cashout</h3>
        </ScreenContainer>
    )
}

