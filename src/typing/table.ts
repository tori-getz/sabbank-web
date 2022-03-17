 
import type { ReactNode } from 'react';

export interface ITableColumn {
    Header: string | ReactNode
    accessor: string
    minWidth?: number
    width?: number
    maxWidth?: number
}

export interface ITableData {
    [accessor: string]: string | ReactNode
}

export type TableColumns = Array<ITableColumn>
export type TableData = Array<ITableData>
