
import React from 'react';

// import { ButtonWalletAction } from '@components/ui';
import { IconButton, Card, CardContent } from 'ui-neumorphism';
import { Spinner, Icon, Divider } from '@components/ui';
import styles from 'TransactionsHistory.module.sass'

interface ITransactionHistory {};

interface ITransactionsHistory {
    asset: string
    operation: string
    date: string
    status: string
    sum: number
};

export const TransactionsHistory: React.FC<ITransactionHistory> = () => {
    const transactions: Array<ITransactionsHistory> = [
        {
            asset: 'btc', 
            operation: 'Продажа',
            date: '8.06.2021, 22:11',
            status: 'Продано',
            sum: 0.315,        
        },
        {
            asset: 'btc', 
            operation: 'Продажа',
            date: '8.06.2021, 22:11',
            status: 'Продано',
            sum: 0.315,        
        },
        {
            asset: 'btc', 
            operation: 'Продажа',
            date: '8.06.2021, 22:11',
            status: 'Продано',
            sum: 0.315,        
        },
        {
            asset: 'btc', 
            operation: 'Продажа',
            date: '8.06.2021, 22:11',
            status: 'Продано',
            sum: 0.315,        
        },                 
    ];

    return (
        <Card>
            <CardContent >
                <div className="transactionsTable">
                    <div className="row py-3">
                        <div className="col-2">Счет</div>
                        <div className="col-2">Операция</div>
                        <div className="col-2">Дата</div>
                        <div className="col-3">Статус</div>
                        <div className="col-3">Сумма</div>
                    </div>
                    <Divider />
                    {transactions.map((row: ITransactionsHistory, key: number) => (
                        <>
                            <div className="row py-3">
                                <div className="col-2">
                                    <IconButton
                                        rounded
                                        size='small'
                                        text={false}
                                        color=''
                                    >
                                        <Icon name={row.asset} size={16}></Icon>
                                    </IconButton>                
                                    {row.asset}
                                </div>
                                <div  ></div>
                            </div>
                            <Divider />
                        </>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
