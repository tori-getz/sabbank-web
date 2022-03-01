
import React from 'react';

import { useSocket, useTranslation } from '@hooks';

import { ScreenContainer } from '@containers';
import { WalletActions, TransactionsHistory} from '@components';

interface IDashboardScreen {};

export const DashboardScreen: React.FC<IDashboardScreen> = () => {
    useSocket();

    const { t } = useTranslation();

    return (
        <ScreenContainer title={t('Main')}>
            <div className="widgetTitle pt-3">{t('Действия')}</div>
            <WalletActions />
            <div className="widgetTitle pt-4">{t('История транзакций')}</div>
            <TransactionsHistory />
        </ScreenContainer>
    )
}
