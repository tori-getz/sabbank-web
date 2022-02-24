import React, { InputHTMLAttributes } from 'react';

import styles from './TextInput.module.sass';

interface ITextInput extends InputHTMLAttributes<HTMLInputElement> {
    icon?: string
    iconAction?: () => any
}

export const TextInput: React.FC<ITextInput> = ({ 
    ...props
}) => {
    return (
        <div className={styles.wrapper}>
            <input 
                {...props} 
                className={styles.input} 
            />
        </div>
    )
}
