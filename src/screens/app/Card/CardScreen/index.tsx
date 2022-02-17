
import React from 'react';

import { ScreenContainer } from '@containers';

import { useTranslation } from '@hooks';

interface ICardScreen {};

export const CardScreen: React.FC<ICardScreen> = () => {
    const { t }  = useTranslation();
    
    return (
        <ScreenContainer title={t('Card')}>
            <h1>{t('Card')}</h1>
        </ScreenContainer>
    )
}
