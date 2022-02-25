
import React from 'react';

import { IDepositSettingCurrency } from '@typing';

import { Card, CardContent, IconButton } from 'ui-neumorphism';

import { Icon, RadioButton } from '@components/ui';

import styles from './CurrencyRadio.module.sass';
import cn from 'classnames';

interface ICurrencyRadio {
    item: IDepositSettingCurrency,
    percentageKey: number,
    active?: boolean,
    onClick: () => any
};

export const CurrencyRadio: React.FC<ICurrencyRadio> = ({
    item,
    percentageKey,
    active,
    onClick
}) => {
    return (
        <Card inset={active}>
            <CardContent>
                <div
                    className={cn(
                        styles.wrapper,
                        'p-2',
                        'd-flex',
                        'align-items-center'
                    )}
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
                    <div>
                        <p>{item.name}</p>
                        <p className={styles.asset}>{item.asset.toUpperCase()}</p>
                    </div>
                    <h1
                        className={cn(
                            { [styles.percentageActive]: active }
                        )}
                    >
                        {item.data[percentageKey].percentage}%
                    </h1>
                </div>
            </CardContent>
        </Card>
    )
}
