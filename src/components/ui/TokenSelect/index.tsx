
import React, { useState } from 'react';

import { Card, CardContent } from 'ui-neumorphism';

import {
    Icon,
    TokenSelectItem
} from '@components/ui';

import type {
    iCurrency
} from '@typing'

interface ITokenSelect {
    items: Array<iCurrency>
    defaultValue: iCurrency
    onChange: (token: iCurrency) => any
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

    const [ defaultCurrency, setDefaultCurrency ] = useState<iCurrency>(defaultValue);
    const [ list, setList ] = useState<iCurrency[]>(items.filter(item => item.asset !== defaultValue.asset));

    const onSelect = (item: iCurrency) => {
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
                {list.map((item: iCurrency, key: number) => (
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
