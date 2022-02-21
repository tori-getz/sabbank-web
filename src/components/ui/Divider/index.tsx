import React from 'react';
import styles from './Divider.module.sass';
import cn from 'classnames';


interface IDivider {
    className?: string
}

export const Divider: React.FC<IDivider> = ({
    className,
    ...props
}) => {
    return (
        <div className={cn(styles.divider, className)}></div>
    )
}