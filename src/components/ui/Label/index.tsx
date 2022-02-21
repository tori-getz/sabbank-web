import React from 'react';
import styles from './Label.module.sass';
import cn from 'classnames';


interface ILabel {
    children: string
    htmlFor?: string
    className?: string
}

export const Label: React.FC<ILabel> = ({
    children,
    htmlFor,
    className,
    ...props
}) => {
    return (
        <label className={cn(styles.label, className)} htmlFor={htmlFor} {...props}>{children}</label>
    )
}