import React from 'react';
import { Spinner } from '@components/ui';
import styles from './Button.module.sass';
import cn from 'classnames';


interface IButton {
    label: string
    loading?: boolean
    variant?: 'primary' | 'secondary'
    onClick?: () => any
    disabled?: boolean
    className?: string
}

export const Button: React.FC<IButton> = ({
    label, 
    loading,
    className,
    disabled = false,
    ...props
}) => {
    const renderLabel = () => {
        if (loading) {
            return (
                <Spinner
                    variant='light'
                />

            )
        }

        return label;
    }
    return (
        <button
            className={cn(
                styles.button,
                { [styles.buttonDisabled]: disabled },
                className
            )}
            disabled={disabled}
            {...props}
        >
            {renderLabel()}
        </button>
    )
}