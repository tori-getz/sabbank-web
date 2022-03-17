
import React from 'react';

import { CurrencyListItem, Spinner } from '@components/ui';

import { useWallet, useTranslation } from '@hooks';

import type { IWalletCurrency } from '@typing';

import { isEmpty } from 'lodash';

interface IWalletCurrencyList {};

export const CurrencyList: React.FC<IWalletCurrencyList> = () => {
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

        return currencies.map((currency: IWalletCurrency, key: number) => (
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
