
import React from 'react';

import { Card, CardContent } from 'ui-neumorphism';

import type { ICredit } from '@typing';

import { useTranslation } from '@hooks';

import styles from './CreditItem.module.sass';
import cn from 'classnames';

import { format as formatDate } from 'date-fns';

import { moneyAmountFormatter } from '@utils';

import { Icon } from '@components/ui';

interface ICreditItem {
    item: ICredit
    onClick: () => any
}

export const CreditItem: React.FC<ICreditItem> = ({
    item,
    onClick
}) => {
    const { t } = useTranslation();

    return (
        <Card>
            <CardContent>
                <div
                    className={cn(styles.wrapper)}                
                    onClick={onClick}
                >
                    <div className={styles.header}>
                        <div className={styles.label}>{t('Credit')} №{item.number}</div>
                        <div
                            className={cn(
                                styles.creditStatus,
                                styles[`creditStatus__${item.status}`]
                            )}
                        >
                            {t(`creditStatus__${item.status}`)}
                        </div>
                        <div className={cn(styles.label, styles.nextPayment)}> {t('Next payment')} </div>
                        <div className={styles.date}>{formatDate(new Date(item.next_payment), 'dd.MM.yyyy')}</div>
                    </div>
                    <div className={styles.body}>
                        <div className={styles.depositAmount}>{moneyAmountFormatter(item.deposit, 8)} {item.deposit_currency.toUpperCase()}</div>
                        <Card className={styles.ltv}>
                            <CardContent>
                                <div>
                                    LTV {item.ltv}%
                                </div>
                            </CardContent>
                        </Card>
                        <div className={styles.icon}>
                            <Icon
                                name='arrow-right'
                                size={20}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
