
import React from 'react';

import { CurrencyListItem } from '@components/ui';

import { useWallet, useTranslation } from '@hooks';

import type { iCurrency } from '@typing';

interface ICurrencyList {};

export const CurrencyList: React.FC<ICurrencyList> = () => {
    const { t } = useTranslation();

    const { currencies } = useWallet();

    return (
        <div>
            <h1>{t('Currencies')}</h1>
            {currencies.map((currency: iCurrency, key: number) => (
                <CurrencyListItem {...currency} />
            ))}
        </div>
    );
}
