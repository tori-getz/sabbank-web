
import React, { useState, useEffect, useMemo } from 'react';

import {
    useTranslation,
    useWallet
} from '@hooks';

import type {
    TableColumns,
    TableData
} from '@typing';

import { Card, CardContent } from 'ui-neumorphism';

import {
    Table,
    TableFilter,
    AmountTableItem
} from '@components/ui';

interface IWalletTransactionsHistory {
    asset: string
}

export const WalletTransactionsHistory: React.FC<IWalletTransactionsHistory> = ({
    asset
}) => {
    const { t } = useTranslation();    

    return (
        <>
            <h2>{t('Transaction history')}</h2>
        </>
    )
}
