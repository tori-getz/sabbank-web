
import React, { useMemo, useEffect, useState } from 'react';

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
    CurrencyTableItem,
    AmountTableItem,
    TableFilter
} from '@components/ui';

import { isEmpty } from 'lodash';
import { format as formatDate } from 'date-fns';

import styles from './TransactionsHistory.module.sass';
import cn from 'classnames';

interface ITransactionHistory {};

export const TransactionsHistory: React.FC<ITransactionHistory> = () => {
    const { t, language } = useTranslation();

    const {
        transactions,
        currencies
    } = useWallet();

    const [ asset, setAsset ] = useState<string>('');
    const [ operation, setOperation ] = useState<string>('');

    const columns: TableColumns = useMemo(() => [
        {
            Header: (
                <TableFilter
                    label={t('Cryptocurrency')}
                    activeLabel={asset.toUpperCase()}
                    value={asset}
                    onChange={setAsset}
                    values={currencies.map(c => ({
                        label: (
                            <CurrencyTableItem
                                asset={c.asset}
                                name={c.name}
                            />
                        ),
                        value: c.asset
                    }))}
                />
            ),
            accessor: 'crypto',
            minWidth: 110
        },
        {
            Header: (
                <TableFilter
                    label={t('Operation')}
                    activeLabel={t(`transactionOperation__${operation}`)}
                    value={operation}
                    onChange={setOperation}
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
            Header: t('Date'),
            accessor: 'date',
            minWidth: 120
        },
        {
            Header: t('Status'),
            accessor: 'status',
            minWidth: 85
        },
        {
            Header: t('Amount'),
            accessor: 'amount',
            maxWidth: 155
        }
    ], [language, asset, operation]);

    const [ data, setData ] = useState<TableData>([]);

    useEffect(() => {
        if (isEmpty(transactions)) return setData([]);

        let table: TableData = [];

        for (let transaction of transactions) {
            if (asset && transaction.asset_ticker !== asset) continue;
            if (operation && transaction.operation !== operation) continue;

            table.push({
                crypto: (
                    <CurrencyTableItem
                        asset={transaction.asset_ticker}
                        name={transaction.asset_ticker.toUpperCase()}
                    />
                ),
                operation: t(`transactionOperation__${transaction.operation}`),
                date: formatDate(new Date(transaction.date), 'dd.MM.yyyy, hh:mm'),
                status: (
                    <div className={cn({ [styles.statusError]: [ 'rejected', 'failed', 'internal_error' ].includes(transaction.status) })}>
                        {t(transaction.status === 'success' ? `transactionStatus__${transaction.operation}` : `transactionStatus__${transaction.status}`)}
                    </div>
                ),
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
    }, [transactions, language, asset, operation]);

    return (
        <>
            <Card>
                <CardContent>
                    <Table
                        columns={columns}
                        data={data}
                    />         
                    {isEmpty(data) && (
                        <div className={styles.noTransactions}>
                            {t('No transactions')}
                        </div>       
                    )}
                </CardContent>
            </Card>
        </>
    )
}
