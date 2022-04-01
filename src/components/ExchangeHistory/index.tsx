
import React from 'react';

import { useTranslation } from '@hooks';

interface IExchangeHistory {}

export const ExchangeHistory: React.FC<IExchangeHistory> = () => {
    const { t } = useTranslation();

    return (
        <>
            <h3 className='mt-5'>{t('Exchange history')}</h3>
        </>
    )
}
