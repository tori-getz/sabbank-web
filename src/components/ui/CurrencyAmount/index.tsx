
import React from 'react';

import { Card, CardContent } from 'ui-neumorphism';

import styles from './CurrencyAmount.module.sass';

interface IWalletCurrencyAmount {
    amount: string | number
    asset: string
    children?: React.ReactNode
}

export const CurrencyAmount: React.FC<IWalletCurrencyAmount> = ({
    amount,
    asset,
    children
}) => {
    return (
        <Card>
            <CardContent>
                <div className={styles.wrapper}>
                    <div className={styles.amount}>{amount}</div>    
                    <div className={styles.asset}>{asset.toUpperCase()}</div>
                    <div className={styles.right}>
                        {children}
                    </div>
                </div>  
            </CardContent>
        </Card>
    )
}
