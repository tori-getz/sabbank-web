
import React from 'react';

import { CurrencyListItem, Spinner } from '@components/ui';

import { useWallet, useTranslation } from '@hooks';

import type { IWalletCurrency } from '@typing';

import { isEmpty } from 'lodash';

interface IWalletCurrencyList {
    className?: string
}

export const CurrencyList: React.FC<IWalletCurrencyList> = ({
    className
}) => {
    const { t } = useTranslation();

    const { rateData } = useWallet();

    const renderCurrencies = () => {
        if (isEmpty(rateData)) {
            return (
                <Spinner
                    variant='dark'
                />
            )
        }

        return rateData.map((currency: IWalletCurrency, key: number) => (
            <CurrencyListItem
                {...currency}
                key={key}
            />
        ));
    }

    return (
        <div className={className}>
            <div className="widgetTitle">{t('Currencies')}</div>
            {renderCurrencies()}
        </div>
    );
}
