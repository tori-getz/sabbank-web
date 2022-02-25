
import React from 'react';

import styles from './RadioButton.module.sass';
import cn from 'classnames';

interface IRadioButton {
    value: boolean,
    onClick?: () => any
    className?: string
};

export const RadioButton: React.FC<IRadioButton> = ({
    value,
    onClick,
    className
}) => {
    return (
        <div
            className={cn(styles.border, className)}
            onClick={onClick}
        >
            <div
                className={cn(
                    styles.body,
                    { [styles.bodyDisabled]: !value }
                )}
            />
        </div>
    )
}

