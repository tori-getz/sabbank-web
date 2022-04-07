
import React from 'react';

import { Card, CardContent } from 'ui-neumorphism';

import styles from './TabButton.module.sass';
import cn from 'classnames';

interface ITabButton {
    label: string
    active: boolean
    onClick: () => any
    className?: string
}

export const TabButton: React.FC<ITabButton> = ({
    label,
    active,
    onClick,
    className
}) => {
    return (
        <Card
            className={cn('flex-1 p-1', className)}
            inset={!active}
        >
            <CardContent>
                <div className={styles.wrapper}>
                    <div
                        className={cn(
                            styles.label,
                            { [styles.labelActive]: active }
                        )}
                        onClick={onClick}
                    >
                        {label}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
