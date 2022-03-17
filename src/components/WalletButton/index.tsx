
import React from 'react';

import { useProfile } from '@hooks';

import type { IWalletCurrency } from '@typing';

import { moneyAmountFormatter } from '@utils';

import { Card, CardContent, IconButton } from 'ui-neumorphism';

import { Icon } from '@components/ui';

import styles from './WalletButton.module.sass';

interface IWalletButton {
    item: IWalletCurrency,
    onClick?: () => any,
    className?: string
}

export const WalletButton: React.FC<IWalletButton> = ({
    item,
    onClick,
    className
}) => {
    const { settings } = useProfile();

    return (
        <Card className={className}>
            <CardContent>
                <div
                    className={styles.wrapper}
                    onClick={onClick}
                >
                    <div className='d-flex align-items-center'>
                        <IconButton
                            size='small'
                            text={false}
                            color=''
                            rounded
                        >
                            <Icon 
                                name={item.asset}
                            />
                        </IconButton>
                        <div className={styles.currencyName}>{item.name}</div>
                        <Icon
                            name='arrow-right'
                            className={styles.arrowRight}
                            size={16}
                        />
                    </div>
                    <div className='mt-3'>
                        <div className={styles.balance}>{moneyAmountFormatter(item.balance, 8)} {item.asset.toUpperCase()}</div>
                        <div className={styles.fiatBalance}>{settings?.fiat_currency?.symbol} {moneyAmountFormatter(item.balance * item.price[settings?.fiat_currency.iso_code], 2)}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}