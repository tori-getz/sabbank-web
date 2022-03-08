
import React from 'react';

import { Card, CardContent } from 'ui-neumorphism';

import styles from './TotalEarnings.module.sass';

import { useDeposit, useTranslation } from '@hooks';

import cn from 'classnames';

interface ITotalEarnings {};

export const TotalEarnings: React.FC<ITotalEarnings> = () => {
    const { t } = useTranslation();
    const { totalAmount } = useDeposit();

    return (
        <Card>
            <CardContent>
                <div className={cn(styles.wrapper, 'd-flex flex-wrap justify-content-between p-4')}>
                    <div className="widgetTitle">{t('Total earnings')}</div>
                    <div className={styles.amount}>{totalAmount} USDT</div>
                </div>
            </CardContent>
        </Card>
    )
}
