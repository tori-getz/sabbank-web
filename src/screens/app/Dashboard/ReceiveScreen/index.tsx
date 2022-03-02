
import React from 'react';

import {
    ScreenContainer
} from '@containers';

import {
    GoBack
} from '@components/ui';

import { useNavigate } from 'react-router-dom';

interface IReceiveScreen {};

export const ReceiveScreen: React.FC<IReceiveScreen> = () => {
    const navigate = useNavigate();

    return (
        <ScreenContainer>
            <GoBack onClick={() => navigate('/dashboard')} />
            <h3>Receive</h3>
        </ScreenContainer>
    )
}
