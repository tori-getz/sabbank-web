import React, { InputHTMLAttributes } from 'react';

import styles from './TextInput.module.sass';
import cn from 'classnames';

import { Icon } from '@components/ui';

interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
    icon?: string
    iconAction?: () => any
    error?: boolean
    className?: string
}

export const TextInput: React.FC<ITextInput> = ({ 
    error,
    className,
    ...props
}) => {
    return (
        <div className={cn(styles.wrapper, className)}>
            <input 
                {...props} 
                className={styles.input} 
            />
            {error && (
                <div className={styles.icon}>
                    <Icon name='error' />
                </div>
            )}
        </div>
    )
}
