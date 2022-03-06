
import React from 'react';

import { Card, CardContent } from 'ui-neumorphism';

import {
    Icon
} from '@components/ui';

import styles from './SettingsButton.module.sass';
import cn from 'classnames';

interface ISettingsButton {
    title: string
    description?: string
    onClick: () => any
    className?: string
}

export const SettingsButton: React.FC<ISettingsButton> = ({
    title,
    onClick,
    description,
    className
}) => {
    return (
        <Card className={className}>
            <CardContent>
                <div 
                    className={cn(styles.btn, 'p-4')}
                    onClick={onClick}
                >
                    <div>
                        <div className={styles.title}>{title}</div>
                        {description && (
                            <div className={styles.description}>{description}</div>
                        )}
                    </div>
                    <Icon
                        name='arrow-right'
                        className={styles.icon}
                        size={18}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
