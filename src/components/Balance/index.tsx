
import React from 'react';

import {
    useTranslation,
    useUser,
    useWallet
} from '@hooks';

import { moneyAmountFormatter } from '@utils';

interface IBalance {};

export const Balance: React.FC<IBalance> = () => {
    const { t } = useTranslation();

    const { settings } = useUser();
    const { totalBalance } = useWallet();

    const amount = moneyAmountFormatter(totalBalance[settings?.fiat_currency?.iso_code], 2);

    return (
        <div>
            <h3>{t('Total balance')}</h3>
            <h1>{settings?.fiat_currency?.symbol} {amount}</h1>
        </div>
    )
}
