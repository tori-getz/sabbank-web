
import React from 'react';

import type {
    ICreditRepaymentSchedule
} from '@typing';

import { useTranslation } from '@hooks';

import { Button } from '@components/ui';

import { moneyAmountFormatter } from '@utils';
import { format as formatDate } from 'date-fns';

import styles from './CreditScheduleItem.module.sass';

interface ICreditScheduleItem {
    item: ICreditRepaymentSchedule
    disabled?: boolean
    onClick?: () => any
}

export const CreditScheduleItem: React.FC<ICreditScheduleItem> = ({
    item,
    disabled,
    onClick
}) => {
    const { t } = useTranslation();

    return (
        <div className='d-flex justify-content-between mb-4'>
            <div>
                <div className='d-flex'>
                    <div className={styles.amount}>{moneyAmountFormatter(item.amount, 8)}</div>
                    <div className={styles.asset}>USDT</div>
                </div>
                <div className={styles.date}>{formatDate(new Date(item.due_ts), 'dd.MM.yyyy')}</div>
            </div>
            <div>
                <Button
                    label={t('Pay')}
                    disabled={disabled}
                    onClick={onClick}
                />
            </div>
        </div>
    )
}
