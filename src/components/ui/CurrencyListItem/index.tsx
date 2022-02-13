
import React from 'react';

import type { iCurrency } from '@typing';

import styles from './CurrencyListItem.module.sass';
import { moneyAmountFormatter } from '../../../utils/moneyAmountFormatter';

import { useUser } from '@hooks';

export const CurrencyListItem: React.FC<iCurrency> = currency => {
    const { settings } = useUser();

    return (
        <div className={styles.wrapper}>
            <div className={styles.icon} />
            <div className={styles.name}>
                <h3>{currency.name}</h3>
                <h4>{currency.asset.toUpperCase()}</h4>
            </div>
            <div className={styles.info}>
                <h4>{moneyAmountFormatter(currency.price[settings?.fiat_currency?.iso_code], 4)} {settings?.fiat_currency?.symbol}</h4>
            </div>
        </div>
    )
}
