
import React from 'react';

import styles from './NavDrawerLink.module.sass';
import cn from 'classnames';

interface INavDrawerLink {
    active?: boolean
    title: string
    onClick?: () => any
}

export const NavDrawerLink: React.FC<INavDrawerLink> = ({
    active,
    title,
    onClick
}) => {
    return (
        <div
            className={styles.wrapper}
            onClick={onClick}
        >
            <div
                className={cn(
                    styles.indicator,
                    { [styles.indicatorActive]: active }
                )} 
            />
            <div className={styles.title}>{title}</div>
        </div>
    )
}
