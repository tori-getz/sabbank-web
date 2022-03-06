import React, { InputHTMLAttributes } from 'react';

import styles from './TextInput.module.sass';

import { Icon } from '@components/ui';

interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
    icon?: string
    iconAction?: () => any
    error?: boolean
}

export const TextInput: React.FC<ITextInput> = ({ 
    error,
    ...props
}) => {
    return (
        <div className={styles.wrapper}>
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
