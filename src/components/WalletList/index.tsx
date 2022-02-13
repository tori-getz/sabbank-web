
import React from 'react';

import { useTranslation, useWallet } from '@hooks';

import { WalletListItem } from '@components/ui';

import type { iCurrency } from '@typing';

interface IWalletList {};

export const WalletList: React.FC<IWalletList> = () => {
    const { t } = useTranslation();

    const { currencies } = useWallet();

    return (
        <div>
            <h1>{t('Wallets')}</h1>
            {currencies.map((currency: iCurrency, key: number) => (
                <WalletListItem
                    {...currency}
                    key={key}
                />
            ))}
        </div>
    )
}
