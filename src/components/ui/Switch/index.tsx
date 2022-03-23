
import React from 'react';

import styles from './Switch.module.sass';
import cn from 'classnames';

interface ISwitch {
    value: boolean
    onChange: () => any
    disabled?: boolean
}

export const Switch: React.FC<ISwitch> = ({
    value,
    onChange
}) => {
    return (
        <div
            className={cn(
                styles.wrapper,
                { [styles.active]: value }
            )}
            onClick={onChange}
        >
            <div
                className={styles.toggle}
            />
        </div>
    )
}
