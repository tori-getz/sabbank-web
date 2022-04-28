
import React from 'react';

import type {
    TransactionOperation
} from '@typing';

import {
    useProfile,
    useWallet
} from '@hooks';

import {
    Icon
} from '@components/ui';

import { moneyAmountFormatter } from '@utils';

import styles from './AmountTableItem.module.sass';
import cn from 'classnames';

interface IAmountTableItem {
    amount: string
    asset: string
    operation?: TransactionOperation
}

export const AmountTableItem: React.FC<IAmountTableItem> = ({
    amount,
    asset,
    operation
}) => {
    const { settings } = useProfile();
    const { currencies } = useWallet();

    const crypto = currencies.find(c => c.asset === asset);

    return (
        <div>
            <div className={styles.amount}>{moneyAmountFormatter(amount, 8)} {asset.toUpperCase()}</div>
            {operation && (
                <div className={styles.operation}>
                    <Icon name={`cash_${operation}`} />
                    <div className={cn(styles.amount, styles[`cash_${operation}`])}>
                        {settings?.fiat_currency?.symbol}{moneyAmountFormatter(Number(amount) * crypto?.price[settings?.fiat_currency?.iso_code], 2)}
                    </div>
                </div>
            )}
        </div>
    )
}


