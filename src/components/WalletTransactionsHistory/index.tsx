
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

import { isEmpty } from 'lodash';
import { format as formatDate } from 'date-fns';

interface IWalletTransactionsHistory {
    asset: string
}

export const WalletTransactionsHistory: React.FC<IWalletTransactionsHistory> = ({
    asset
}) => {
    const { t, language } = useTranslation();

    const { transactions } = useWallet();

    const filteredTransactions = transactions.filter(t => t.asset_ticker === asset);

    const [ operation, setOperation ] = useState<string>('');

    const columns: TableColumns = useMemo(() => [
        {
            Header: t('Date'),
            accessor: 'date',
            minWidth: 120
        },
        {
            Header: (
                <TableFilter
                    value={operation}
                    onChange={setOperation}
                    label={t('Operation')}
                    activeLabel={t(`transactionOperation__${operation}`)}
                    values={[
                        {
                            label: t('transactionOperation__in'),
                            value: 'in'
                        },
                        {
                            label: t('transactionOperation__out'),
                            value: 'out'
                        }
                    ]}
                />
            ),
            accessor: 'operation',
            minWidth: 85
        },
        {
            Header: t('Transaction number'),
            accessor: 'number',
            minWidth: 120
        },
        {
            Header: t('Amount'),
            accessor: 'amount',
            maxWidth: 155
        }
    ], [language, operation]);

    const [ data, setData ] = useState<TableData>([]);

    useEffect(() => {
        if (isEmpty(filteredTransactions)) return;

        let table = [];

        for (let transaction of filteredTransactions) {
            if (operation && transaction.operation !== operation) continue;

            table.push({
                date: formatDate(new Date(transaction.date), 'dd.MM.yyyy, hh:mm'),
                operation: t(`transactionOperation__${transaction.operation}`),
                number: transaction.id,
                amount: (
                    <AmountTableItem
                        amount={transaction.amount}
                        asset={transaction.asset_ticker}
                        operation={transaction.operation}
                    />
                )
            });
        }

        setData(table);
    }, [filteredTransactions, language, operation]);

    if (isEmpty(filteredTransactions)) return null;

    return (
        <>
            <div className="widgetTitle">{t('Transaction history')}</div>
            <Card>
                <CardContent>
                    <Table
                        columns={columns}
                        data={data}
                    />
                </CardContent>
            </Card>
        </>
    )
}
