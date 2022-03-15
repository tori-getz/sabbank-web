
import React from 'react';

import { CurrencyListItem, Spinner } from '@components/ui';

import { useWallet, useTranslation } from '@hooks';

import type { ICurrency } from '@typing';

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

        return currencies.map((currency: ICurrency, key: number) => (
            <CurrencyListItem
                {...currency}
                key={key}
            />
        ));
    }

    return (
        <div className="d-none d-md-block">
            <div className="widgetTitle">{t('Currencies')}</div>
            {renderCurrencies()}
        </div>
    );
}
