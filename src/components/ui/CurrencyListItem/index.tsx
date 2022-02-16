
import React from 'react';

import type { iCurrency } from '@typing';

import styles from './CurrencyListItem.module.sass';
import { moneyAmountFormatter } from '../../../utils/moneyAmountFormatter';
import { IconButton } from 'ui-neumorphism';
import { Chart, Icon } from '@components/ui'

import { useUser } from '@hooks';

export const CurrencyListItem: React.FC<iCurrency> = currency => {
    const { settings } = useUser();

    return (
        <>
            <div className={styles.wrapper}>
                <IconButton rounded size='small' text={false} color=''>
                    <Icon name='btc' size={16}></Icon>
                </IconButton>                

                <div className={styles.titleBlock}>
                    <div className={styles.title}>{currency.name}</div>
                    <div className={styles.asset}>{currency.asset.toUpperCase()}</div>
                </div>
                <Chart data={currency.chart_data} />
                <div className={styles.amountBlock}>
                    <div className={styles.titleBlock}>{settings?.fiat_currency?.symbol}{moneyAmountFormatter(currency.price[settings?.fiat_currency?.iso_code], 4)}</div>
                </div>
            </div>
            <div className={styles.divider}></div>
        </>
    )
}
