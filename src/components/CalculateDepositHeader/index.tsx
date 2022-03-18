
import React from 'react';

import type {
    IDepositSettingCurrency,
    IDepositSettingCurrencyPeriod
} from '@typing';

import { Icon } from '@components/ui';

import { useTranslation } from '@hooks';

import { Card, CardContent, IconButton } from 'ui-neumorphism';

import styles from './CalculateDepositHeader.module.sass';
import cn from 'classnames';

interface ICalculateDepositHeader {
    currency: IDepositSettingCurrency,
    period: IDepositSettingCurrencyPeriod
};

export const CalculateDepositHeader: React.FC<ICalculateDepositHeader> = ({
    currency,
    period
}) => {
    const { t, language } = useTranslation();

    return (
        <div className={styles.wrapper}>
            <Card className={styles.block}>
                <CardContent>
                    <div  className={styles.wrapperRadio}>
                        <IconButton
                            rounded
                            size='large'
                            color=''
                            text={false}
                        >
                            <Icon name={currency.asset} size={20} />
                        </IconButton>
                        <div className={styles.currencyInfo}>
                            <div className={styles.currencyName}>{currency.name}</div>
                            <div className={styles.currencyAsset}>{currency.asset.toUpperCase()}</div>
                        </div>
                        <div className={styles.value}>{period?.percentage}%</div>
                    </div>
                </CardContent>
            </Card>
            <Card className={styles.block}>
                <CardContent>
                    <div
                        className={cn(
                            styles.termBlock,
                            'p-2'
                        )}
                    >
                        <div className={styles.currencyName}>{t('Term')}</div>
                        <div className={styles.value}>{period?.depositPeriod[`name_${language}`] || ''}</div>
                    </div>        
                </CardContent>
            </Card>
        </div>
    )
}
