
import React from 'react';

import { useTranslation, useWallet } from '@hooks';

import { WalletListItem, Spinner } from '@components/ui';

import type { iCurrency } from '@typing';

import { isEmpty } from 'lodash'

interface IWalletList {};

export const WalletList: React.FC<IWalletList> = () => {
    const { t } = useTranslation();

    const { currencies } = useWallet();

    const renderWallets = () => {
        if (isEmpty(currencies)) {
            return (
                <Spinner
                    variant='dark'
                />
            )
        }

        return currencies.map((currency: iCurrency, key: number) => (
            <WalletListItem
                {...currency}
                key={key}
            />
        ));
    }

    return (
        <div className="mb-5">
            <div className="widgetTitle">{t('Wallets')}</div>
            {renderWallets()}
        </div>
    )
}
