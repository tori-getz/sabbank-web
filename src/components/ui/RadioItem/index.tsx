
import React from 'react';

import {
    RadioButton,
    Button
} from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';

import styles from './RadioItem.module.sass';

interface IRadioItem {
    active: boolean
    label: string
    amount?: string
    onClick?: () => any
    className?: string
}

export const RadioItem: React.FC<IRadioItem> = ({
    active,
    label,
    amount,
    className,
    onClick
}) => {
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
                    <RadioButton value={active} />
                    <div className={styles.label}>{label}</div>
                    {amount && (
                        <div className={styles.amount}>{amount}</div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
