

import React from 'react';

import styles from './Details.module.sass';

interface IDetail {
    name: string
    value: string
}

interface IDetails {
    items: Array<IDetail>
    className?: string
}

export const Details: React.FC<IDetails> = ({
    items,
    className
}) => {
    return (
        <div className={className}>
            {items.map(({ name, value }: IDetail, key: number) => (
                <div
                    className={styles.row}
                    key={key}
                >
                    <div className={styles.name}>{name}</div>
                    <div className={styles.value}>{value}</div>
                </div>
            ))}
        </div>
    );
}