
import React from 'react';

import { Icon } from '@components/ui';

import { useUser } from '@hooks';

import { IconButton } from 'ui-neumorphism';

import styles from './TokenSelectItem.module.sass';
import cn from 'classnames';

import { moneyAmountFormatter } from '@utils';

import { iCurrency } from '@typing';

interface ITokenSelectItem extends iCurrency {
    onClick?: () => any
};

export const TokenSelectItem: React.FC<ITokenSelectItem> = ({
    name,
    asset,
    balance,
    price,
    onClick
}) => {
    const { settings } = useUser();

    return (
        <div
            className={cn(
                styles.wrapper,
                { [styles.active]: onClick }
            )}
            onClick={onClick}
        >
            <IconButton
                rounded
                size='small'
                text={false}
                color=''
            >
                <Icon name={asset} />
            </IconButton>
            <div>
                <div className={styles.currencyName}>{name}</div>
                <div className={styles.currencyAsset}>{asset.toUpperCase()}</div>
            </div>
            <div className={styles.amountBlock}>
                <div className={styles.amount}>{moneyAmountFormatter(balance, 4)} {asset.toUpperCase()}</div>
                <div className={styles.fiat}>{settings?.fiat_currency?.symbol}{moneyAmountFormatter(balance * price[settings?.fiat_currency?.iso_code], 2)}</div>
            </div>
        </div>
    )
}
