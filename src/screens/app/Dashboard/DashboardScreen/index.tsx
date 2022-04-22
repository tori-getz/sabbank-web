
import React from 'react';

import {
    useTranslation,
    useWallet
} from '@hooks';

import { ScreenContainer } from '@containers';
import {
    WalletActions,
    TransactionsHistory,
    Balance,
    CurrencyList
} from '@components';

import { isEmpty } from 'lodash';

interface IDashboardScreen {};

export const DashboardScreen: React.FC<IDashboardScreen> = () => {
    const { t } = useTranslation();

    const { transactions } = useWallet();

    return (
        <ScreenContainer title={t('Main')}>
            <Balance className='d-md-none' />
            <div className="widgetTitle pt-3">{t('Wallet actions')}</div>
            <WalletActions />
            <CurrencyList className='d-md-none' />
            {!isEmpty(transactions) && (
                <>
                    <div className="widgetTitle pt-4 mb-3">{t('Transaction history')}</div>
                    <TransactionsHistory />
                </>
            )}
        </ScreenContainer>
    )
}
