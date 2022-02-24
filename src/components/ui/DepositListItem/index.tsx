
import React from 'react';

import type { IDeposit } from '@typing';

import { Card, CardContent, IconButton } from 'ui-neumorphism';

import { Icon } from '@components/ui';

import styles from './DepositListItem.module.sass';

import cn from 'classnames';

import { useUser } from '@hooks';

import { moneyAmountFormatter } from '@utils';

interface IDepositListItem extends IDeposit {
    onClick?: () => any
    disabled?: boolean
}

export const DepositListItem: React.FC<IDepositListItem> = ({
    asset,
    name,
    amount,
    disabled,
    onClick
}) => {
    const { settings } = useUser();

    return (
        <Card>
            <CardContent>
                <div
                    className={cn(
                        { [styles.wrapper]: !disabled },
                        'd-flex p-2'
                    )}
                    onClick={onClick}
                >
                    <IconButton
                        rounded
                        size='small'
                        text={false}
                    >
                        <Icon
                            name={asset}
                            size={16}
                        />
                    </IconButton>
                    <div className={styles.titleBlock}>
                        <div className={styles.title}>{name}</div>
                        <div className={styles.asset}>{asset.toUpperCase()}</div>
                    </div>
                    <div className={styles.amountBlock}>
                        <div className={styles.amount}>{moneyAmountFormatter(amount, 4)} {asset.toUpperCase()}</div>
                        {/* <div className={styles.amountUSDT}>{settings?.fiat_currency?.symbol}{moneyAmountFormatter(amount * currency.price[settings?.fiat_currency?.iso_code], 2)}</div> */}
                    </div>
                    {!disabled && (
                        <Icon name='arrow-right' size={16} />
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
