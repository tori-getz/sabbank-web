
import React from 'react';

import type { ICurrency } from '@typing';

import styles from './WalletListItem.module.sass';
import { IconButton, Card, CardContent} from 'ui-neumorphism';
import { Icon } from '@components/ui'

import { moneyAmountFormatter } from '@utils';

import { useProfile } from '@hooks';

interface IWalletListItem extends ICurrency {
    onClick?: () => any
}

export const WalletListItem: React.FC<IWalletListItem> = ({
    onClick,
    ...currency
}) => {
    const { settings } = useProfile();

    return (
        <div onClick={onClick}>
            <Card>
                <CardContent className={styles.wrapper}>            
                    <IconButton
                        rounded
                        size='small'
                        text={false}
                        color=''
                    >
                        <Icon name={currency.asset} size={16}></Icon>
                    </IconButton>                
                    <div className={styles.titleBlock}>
                        <div className={styles.title}>{currency.name}</div>
                        <div className={styles.asset}>{currency.asset.toUpperCase()}</div>
                    </div>
                    <div className={styles.amountBlock}>
                        <div className={styles.amount}>{moneyAmountFormatter(currency.balance, 4)} {currency.asset.toUpperCase()}</div>
                        <div className={styles.amountUSDT}>{settings?.fiat_currency?.symbol}{moneyAmountFormatter(currency.balance * currency.price[settings?.fiat_currency?.iso_code], 2)}</div>
                    </div>
                    <Icon name='arrow-right' size={16}></Icon>
                </CardContent>
            </Card>
        </div>
    )
}
