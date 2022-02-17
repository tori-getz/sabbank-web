
import React, { useEffect } from 'react';

import {
    useTranslation,
    useUser,
    useWallet
} from '@hooks';

import { moneyAmountFormatter } from '@utils';
import styles from './Balance.module.sass';
import cn from 'classnames';

import { isEmpty } from 'lodash';

import { Spinner } from '@components/ui';

interface IBalance {};

export const Balance: React.FC<IBalance> = () => {
    const { t } = useTranslation();

    const { settings } = useUser();
    const { totalBalance } = useWallet();

    const amount = moneyAmountFormatter(totalBalance[settings?.fiat_currency?.iso_code], 2)

    if (isEmpty(totalBalance)) {
        return (
            <div className={styles.widget}>
                <Spinner variant='light' />
            </div>
        )
    }

    return (
        <div className={cn(styles.widget)}>
            <div className={cn(styles.title)}>{t('Total balance')}</div>
            <div className={cn(styles.balance)}>{settings?.fiat_currency?.symbol} {amount}</div>
        </div>
    )
}
