
import React from 'react';

import { Navbar } from 'react-bootstrap';

import {
    useTranslation,
    useProfile,
    useWallet
} from '@hooks';

import { moneyAmountFormatter } from '@utils';

import styles from './NavBalance.module.sass';

interface INavBalance {};

export const NavBalance: React.FC<INavBalance> = () => {
    const { t } = useTranslation();

    const { settings } = useProfile();
    const { totalBalance } = useWallet();

    return (
        <div className={styles.wrapper}>
            <div className={styles.label}>{t('Total balance')}</div>
            <div className={styles.amount}>{settings?.fiat_currency?.symbol}{moneyAmountFormatter(totalBalance[settings?.fiat_currency?.iso_code], 2)}</div>
        </div>
    );
}
