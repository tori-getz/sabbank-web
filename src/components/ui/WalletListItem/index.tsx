
import React from 'react';

import type { iCurrency } from '@typing';

import styles from './WalletListItem.module.sass';
import { IconButton, Card, CardContent} from 'ui-neumorphism';
import { Icon } from '@components/ui'

import { moneyAmountFormatter } from '@utils';

import { useUser } from '@hooks';

export const WalletListItem: React.FC<iCurrency> = currency => {
    const { settings } = useUser();

    return (
        <Card>
            <CardContent>            
            <div className={styles.wrapper}>
                <IconButton rounded size='small' text={false} color='grey'>
                    <Icon name='btc' size={16}></Icon>
                </IconButton>                
                <div className={styles.name}>
                    <h3>{currency.name}</h3>
                    <h4>{currency.asset.toUpperCase()}</h4>
                </div>
                <div className={styles.info}>
                    <h4>{moneyAmountFormatter(currency.balance, 4)} {currency.asset.toUpperCase()}</h4>
                    <h5>{settings?.fiat_currency?.symbol}{moneyAmountFormatter(currency.balance * currency.price[settings?.fiat_currency?.iso_code], 2)}</h5>
                </div>
                <Icon name='arrow-right' size={16}></Icon>
            </div>
            </CardContent>
        </Card>

    )
}
