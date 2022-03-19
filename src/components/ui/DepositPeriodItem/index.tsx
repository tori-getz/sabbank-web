
import React from 'react';

import type {
    IDepositSettingCurrencyPeriod
} from '@typing';

import { useTranslation } from '@hooks';

import { Card, CardContent } from 'ui-neumorphism';

import styles from './DepositPeriodItem.module.sass';
import cn from 'classnames';
import { RadioButton } from '..';

interface IDepositPeriodItem {
    item: IDepositSettingCurrencyPeriod,
    active: boolean
    onClick: () => any
};

export const DepositPeriodItem: React.FC<IDepositPeriodItem> = ({
    item,
    active,
    onClick
}) => {
    const { language } = useTranslation();

    return (
        <Card inset={active}>
            <CardContent className="bgTransparent">
                <div
                    className={cn(
                        styles.wrapper,
                        'd-flex',
                        'p-2'
                    )}
                    onClick={onClick}
                >
                    <RadioButton
                        value={active}
                    />
                    <div className={styles.contentBlock}>
                        <div className={styles.title}>{item.depositPeriod[`name_${language}`]}</div>
                        <div className={styles.description}>{item.depositPeriod[`description_${language}`]}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
