
import React from 'react';

import { IDepositSettingCurrency } from '@typing';

import { Card, CardContent, IconButton } from 'ui-neumorphism';

import { Icon, RadioButton } from '@components/ui';

import styles from './CurrencyRadio.module.sass';
import cn from 'classnames';

interface IWalletCurrencyRadio {
    item: IDepositSettingCurrency,
    percentageKey: number,
    active?: boolean,
    onClick: () => any
};

export const CurrencyRadio: React.FC<IWalletCurrencyRadio> = ({
    item,
    percentageKey,
    active,
    onClick
}) => {
    return (
        <Card inset={active}>
            <CardContent>
                <div
                    className={cn(styles.wrapper)}
                    onClick={onClick}
                >
                    <RadioButton
                        value={active}
                    />
                    <IconButton
                        size='large'
                        text={false}
                        color=''
                        className='m-2'
                        rounded
                    >
                        <Icon
                            name={item.asset}
                            size={20}
                        />
                    </IconButton>
                    <div className={styles.assetColumn}>
                        <div>{item.name}</div>
                        <div className={styles.asset}>{item.asset.toUpperCase()}</div>
                    </div>
                    <div
                        className={cn(
                            styles.percentage,
                            { [styles.percentageActive]: active }
                        )}
                    >
                        {item.data[percentageKey].percentage}%
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
