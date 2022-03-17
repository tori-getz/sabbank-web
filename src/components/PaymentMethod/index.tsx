
import React from 'react';

import {
    Card,
    CardContent,
    IconButton
} from 'ui-neumorphism';

import type {
    IWalletCurrency
} from '@typing';

import {
    useTranslation
} from '@hooks';

import {
    RadioButton,
    Icon
} from '@components/ui';

import {
    moneyAmountFormatter
} from '@utils';

import styles from './PaymentMethod.module.sass';

interface IPaymentMethod {
    active?: boolean
    currency: IWalletCurrency
    comission: string,
    onClick?: () => any
    className?: string
}

export const PaymentMethod: React.FC<IPaymentMethod> = ({
    active,
    currency,
    onClick,
    className,
    comission
}) => {
    const { t } = useTranslation();

    return (
        <Card
            inset={active}
            className={className}
        >
            <CardContent>
                <div
                    className={styles.wrapper}
                    onClick={onClick}
                >
                    <RadioButton
                        value={active}
                    />
                    <IconButton
                        size='large'
                        text={false}
                        color=''
                        className='m-2'
                        rounded
                    >
                        <Icon
                            name={currency.asset}
                            size={20}
                        />
                    </IconButton>
                    <div>
                        <div className={styles.currencyName}>{currency.name} ({currency.asset.toUpperCase()})</div>
                        <div className={styles.currencyAsset}>{comission}% {t('from the sum')}</div>
                    </div>
                    <div className={styles.sum}>
                        {moneyAmountFormatter(currency.balance, 8)} {currency.asset.toUpperCase()}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
