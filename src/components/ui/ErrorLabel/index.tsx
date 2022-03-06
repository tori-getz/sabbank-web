
import React from 'react';

import styles from './ErrorLabel.module.sass';
import cn from 'classnames';

interface IErrorLabel {
    className?: string
    children: string
}

export const ErrorLabel: React.FC<IErrorLabel> = ({
    className,
    children
}) => {
    return (
        <div className={cn(styles.label, className)}>
            {children}
        </div>
    );
}
