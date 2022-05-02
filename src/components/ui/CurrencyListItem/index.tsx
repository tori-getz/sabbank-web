
import React from 'react';

import type { IWalletCurrency } from '@typing';

import styles from './CurrencyListItem.module.sass';
import cn from 'classnames';

import { moneyAmountFormatter } from '@utils';
import { IconButton } from 'ui-neumorphism';
import { Chart, Icon } from '@components/ui'

import { useProfile } from '@hooks';

export const CurrencyListItem: React.FC<IWalletCurrency> = currency => {
    const { settings } = useProfile();

    const percentage = currency.percentage_24h[settings?.fiat_currency?.iso_code];

    return (
        <>
            <div className={styles.wrapper}>
                <IconButton rounded size='small' text={false} color=''>
                    <Icon name={currency.asset} size={16}></Icon>
                </IconButton>                

                <div className={styles.titleBlock}>
                    <div className={styles.title}>{currency.name}</div>
                    <div className={styles.asset}>{currency.asset.toUpperCase()}</div>
                </div>
                <Chart data={currency.chart_data} />
                <div className={styles.amountBlock}>
                    <div className={styles.titleBlock}>{settings?.fiat_currency?.symbol}{moneyAmountFormatter(currency?.price[settings?.fiat_currency?.iso_code], 4)}</div>
                    <div
                        className={cn(
                            styles.percentage,
                            { [styles.percentageUp]: percentage >= 0 },
                            { [styles.percentageDown]: percentage < 0 }
                        )}
                    >
                        {moneyAmountFormatter(percentage, 2)}%
                    </div>
                </div>
            </div>
            <div className={styles.divider}></div>
        </>
    )
}
