
import React, { useMemo } from 'react';

import type {
    TableColumns,
    TableData
} from '@typing';

import {
    useTable,
    useFlexLayout,
    useResizeColumns
} from 'react-table';

import styles from './Table.module.sass';

import { Col } from 'react-bootstrap';

import { Divider } from '@components/ui';

interface ITable {
    columns: TableColumns
    data: TableData
};

export const Table: React.FC<ITable> = ({
    columns,
    data
}) => {
    const defaultColumn = useMemo(() => ({
        minWidth: 30,
        width: 150,
        maxWidth: 200
    }), []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFlexLayout,
        useResizeColumns
    );

    return (
        <div {...getTableProps()}>
            <div className='row py-3'>
                {headerGroups.map(headerGroup => (
                    <>
                        {headerGroup.headers.map(column => (
                            <Col {...column.getHeaderProps()}>
                                <div className={styles.columnHeader}>{column.render('Header')}</div>
                                {column.canResize && (
                                    <div
                                        className={styles.resizer}
                                        {...column.getResizerProps()}
                                    />
                                )}
                            </Col>
                        ))}
                    </>
                ))}
            </div>
            <Divider />
            <div {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);

                    return (
                        <>
                            <div
                                {...row.getRowProps()}
                                className='row py-3 align-items-center'
                            >
                                {row.cells.map(cell => (
                                    <Col {...cell.getCellProps()}>
                                        <div className={styles.cell}>
                                            {cell.render('Cell')}
                                        </div>
                                    </Col>
                                ))}
                            </div>
                            <Divider />
                        </>
                    )
                })}
            </div>
        </div>
    )
}
