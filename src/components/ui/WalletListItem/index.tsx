
import React from 'react';

import type { iCurrency } from '@typing';

import styles from './WalletListItem.module.sass';

import { moneyAmountFormatter } from '@utils';

import { useUser } from '@hooks';

export const WalletListItem: React.FC<iCurrency> = currency => {
    const { settings } = useUser();

    return (
        <div className={styles.wrapper}>
            <div className={styles.icon} />
            <div className={styles.name}>
                <h3>{currency.name}</h3>
                <h4>{currency.asset.toUpperCase()}</h4>
            </div>
            <div className={styles.info}>
                <h4>{moneyAmountFormatter(currency.balance, 4)} {currency.asset.toUpperCase()}</h4>
                <h5>{settings?.fiat_currency?.symbol}{moneyAmountFormatter(currency.balance * currency.price[settings?.fiat_currency?.iso_code], 2)}</h5>
            </div>
        </div>
    )
}
