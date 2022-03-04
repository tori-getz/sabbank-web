
import React from 'react';

import { Card, CardContent } from 'ui-neumorphism';

import styles from './ToggleButton.module.sass';

interface IToggleButton {
    active?: boolean
    label: string
    className?: string
    onClick?: () => any
}

export const ToggleButton: React.FC<IToggleButton> = ({
    active,
    label,
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
                    className={styles.label}
                    onClick={onClick}
                >
                    {label}
                </div>
            </CardContent>
        </Card>
    );
}
