
import React from 'react';

import styles from './Checkbox.module.sass';
import cn from 'classnames';

import { Icon } from '@components/ui';

interface ICheckbox {
    value: boolean
    onChange: () => any
    className?: string
}

export const Checkbox: React.FC<ICheckbox> = ({
    value,
    onChange,
    className
}) => {
    return (
        <div
            className={cn(
                styles.wrapper,
                { [styles.enabled]: value },
                { [styles.disabled]: !value },
                className
            )}
            onClick={onChange}
        >
            {value && (
                <Icon
                    name='check'
                    size={16}
                />
            )}
        </div>
    )
}
