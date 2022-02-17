
import React from 'react';

import { CurrencyListItem, Spinner } from '@components/ui';

import { useWallet, useTranslation } from '@hooks';

import type { iCurrency } from '@typing';

import { isEmpty } from 'lodash';

interface ICurrencyList {};

export const CurrencyList: React.FC<ICurrencyList> = () => {
    const { t } = useTranslation();

    const { currencies } = useWallet();

    const renderCurrencies = () => {
        if (isEmpty(currencies)) {
            return (
                <Spinner
                    variant='dark'
                />
            )
        }

        return currencies.map((currency: iCurrency, key: number) => (
            <CurrencyListItem
                {...currency}
                key={key}
            />
        ));
    }

    return (
        <div>
            <div className="widgetTitle">{t('Currencies')}</div>
            {renderCurrencies()}
        </div>
    );
}
