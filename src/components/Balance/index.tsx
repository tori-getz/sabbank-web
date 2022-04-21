
import React, { useEffect } from 'react';

import {
    useTranslation,
    useProfile,
    useWallet
} from '@hooks';

import { moneyAmountFormatter } from '@utils';
import styles from './Balance.module.sass';
import cn from 'classnames';

import { isEmpty } from 'lodash';

import { Spinner } from '@components/ui';
import { FiatSelect } from '@components';

interface IBalance {};

export const Balance: React.FC<IBalance> = () => {
    const { t } = useTranslation();

    const { settings } = useProfile();
    const { totalBalance } = useWallet();

    const amount = moneyAmountFormatter(totalBalance[settings?.fiat_currency?.iso_code], 2)

    if (isEmpty(totalBalance)) {
        return (
            <div className={cn(styles.widget, "d-none d-md-block")}>
                <Spinner variant='light' />
            </div>
        )
    }

    return (
        <div className={cn(styles.widget, "d-none d-md-block")}>
            <div className='d-flex align-items-center justify-content-between'>
                <div className={cn(styles.title)}>{t('Total balance')}</div>
                <FiatSelect />
            </div>
            <div className={cn(styles.balance)}>{settings?.fiat_currency?.symbol} {amount}</div>
        </div>
    )
}
