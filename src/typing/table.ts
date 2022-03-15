
export interface ITableColumn {
    Header: string
    accessor: string
}

export interface ITableData {
    [accessor: string]: string
}

export type TableColumns = Array<ITableColumn>
export type TableData = Array<ITableData>
