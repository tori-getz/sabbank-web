
import React, { useState } from 'react';

import { Card, CardContent } from 'ui-neumorphism';

import {
    Icon,
    TokenSelectItem
} from '@components/ui';

import type {
    IWalletCurrency
} from '@typing'

interface ITokenSelect {
    items: Array<IWalletCurrency>
    defaultValue: IWalletCurrency
    onChange: (token: IWalletCurrency) => any
    className?: string
}

import styles from './TokenSelect.module.sass';
import cn from 'classnames';

export const TokenSelect: React.FC<ITokenSelect> = ({
    items,
    defaultValue,
    onChange,
    className
}) => {
    const [ isOpen, setOpen ] = useState<boolean>(false);

    const [ defaultCurrency, setDefaultCurrency ] = useState<IWalletCurrency>(defaultValue);
    const [ list, setList ] = useState<IWalletCurrency[]>(items.filter(item => item.asset !== defaultValue.asset));

    const onSelect = (item: IWalletCurrency) => {
        setDefaultCurrency(item);
        setList(items.filter(c => c.asset !== item.asset));
        setOpen(false);
        onChange(item);
    }

    return (
        <div
            className={cn(
                className,
                styles.wrapper
            )}
        >
            <div
                className={styles.defaultValue}
                onClick={() => setOpen(!isOpen)}
            >
                <TokenSelectItem {...defaultCurrency} />
                <div
                    className={cn(
                        styles.expand,
                        { [styles.expandOpen]: isOpen }
                    )}
                >
                    <Icon name='arrow-down' />
                </div>
            </div>
            <div
                className={cn(
                    styles.items,
                    { [styles.itemsOpen]: isOpen }
                )}
            >
                {list.map((item: IWalletCurrency, key: number) => (
                    <TokenSelectItem
                        {...item}
                        key={key}
                        onClick={() => onSelect(item)}
                    />
                ))}
            </div>
        </div>
    )
}
