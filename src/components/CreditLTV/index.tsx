
import React from 'react';

import type {
    CreditLtvStatus
} from '@typing';

import { Card, CardContent } from 'ui-neumorphism';

import styles from './CreditLTV.module.sass';
import cn from 'classnames';

import { ProgressBar } from 'react-bootstrap';

import { useTranslation } from '@hooks';

interface ICreditLTV {
    ltvOriginal: string
    ltvStatus: CreditLtvStatus
    ltv: number
    className?: string
}

export const CreditLTV: React.FC<ICreditLTV> = ({
    ltvOriginal,
    ltvStatus,
    ltv,
    className
}) => {
    const { t } = useTranslation();

    return (
        <div className={className}>
            <Card>
                <CardContent>
                    <div className={cn(
                        styles.ltv,
                        { [styles.ltvWarning]: ltvStatus === 'warning' }
                    )}>
                        LTV {ltv}%
                    </div>
                </CardContent>
            </Card>
            <ProgressBar
                now={ltv}
                className={styles.progress}
                variant={ltvStatus === 'warning' ? 'danger' : 'info'}
            />
            <div className={styles.progressBottom}>
                <div className={styles.low}>{t('Low')}</div>
                <div className={styles.high}>{t('High')}</div>
            </div>
        </div>
    )
}
