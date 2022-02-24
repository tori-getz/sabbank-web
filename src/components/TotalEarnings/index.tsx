
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
                    <h4>{t('Total earnings')}</h4>
                    <h4 className={styles.amount}>{totalAmount} USDT</h4>
                </div>
            </CardContent>
        </Card>
    )
}
