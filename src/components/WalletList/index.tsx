
import React from 'react';

import { useTranslation, useWallet } from '@hooks';
import { useNavigate } from 'react-router-dom';

import { WalletListItem, Spinner } from '@components/ui';

import type { iCurrency } from '@typing';

import { isEmpty } from 'lodash'

import styles from './WalletList.module.sass';

interface IWalletList {};

export const WalletList: React.FC<IWalletList> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { currencies } = useWallet();

    const renderWallets = () => {
        if (isEmpty(currencies)) {
            return (
                <Spinner
                    variant='dark'
                />
            )
        }

        return currencies.map((currency: iCurrency, key: number) => (
            <WalletListItem
                {...currency}
                key={key}
            />
        ));
    }

    return (
        <div className="d-none d-md-block mb-5">
            <div className='d-flex align-items-center justify-content-between'>
                <div className="widgetTitle">{t('Wallets')}</div>
                <div
                    className={styles.seeAll}
                    onClick={() => navigate('/wallet')}
                >
                    {t('See all')}
                </div>
            </div>
            {renderWallets()}
        </div>
    )
}
