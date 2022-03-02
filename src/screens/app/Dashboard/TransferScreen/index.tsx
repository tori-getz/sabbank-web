
import React from 'react';

import {
    ScreenContainer
} from '@containers';

import {
    GoBack
} from '@components/ui';

import { useNavigate } from 'react-router-dom';

interface ITransferScreen {};

export const TransferScreen: React.FC<ITransferScreen> = () => {
    const navigate = useNavigate();

    return (
        <ScreenContainer>
            <GoBack onClick={() => navigate('/dashboard')}/>
            <h2>Transfer</h2>
        </ScreenContainer>
    );
}
