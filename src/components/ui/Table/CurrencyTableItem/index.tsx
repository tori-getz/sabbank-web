
import React from 'react';

import { IconButton } from 'ui-neumorphism';

import { Icon } from '@components/ui';

import styles from './CurrencyTableItem.module.sass';

interface ICurrencyTableItem {
    asset: string
    name: string
}

export const CurrencyTableItem: React.FC<ICurrencyTableItem> = ({
    asset,
    name
}) => {
    return (
        <div className={styles.wrapper}>
            <IconButton
                rounded
                size='small'
                text={false}
                color=''
            >
                <Icon name={asset} />
            </IconButton>
            <div>{name}</div>
        </div>
    )
}
