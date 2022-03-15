
import React from 'react';

// import { ButtonWalletAction } from '@components/ui';
import { Col } from 'react-bootstrap';
import { IconButton, Card, CardContent } from 'ui-neumorphism';
import { Spinner, Icon, Divider, Table } from '@components/ui';
import styles from './TransactionsHistory.module.sass'

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
            asset: 'usdt', 
            operation: 'Продажа',
            date: '8.06.2021, 22:11',
            status: 'Продано',
            sum: 0.315,        
        },
        {
            asset: 'eth', 
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
                        <Col xs={6} md={2}>Счет</Col>
                        <Col xs={6} md={2}>Операция</Col>
                        <Col xs={6} md={3}>Дата</Col>
                        <Col xs={6} md={2}>Статус</Col>
                        <Col xs={6} md={3}>Сумма</Col>
                    </div>
                    <Divider />
                    {transactions.map((row: ITransactionsHistory, key: number) => (
                        <>
                            <div className="row py-3">
                                <Col xs={6} md={2}>
                                    <IconButton
                                        rounded
                                        size='small'
                                        text={false}
                                        color=''
                                    >
                                        <Icon name={row.asset} size={16}></Icon>
                                    </IconButton>                
                                    <span className={styles.asset}>{row.asset}</span>
                                </Col>
                                <Col xs={6} md={2}>{row.operation}</Col>
                                <Col xs={6} md={3}>{row.date}</Col>
                                <Col xs={6} md={2}>{row.status}</Col>
                                <Col xs={6} md={3}>{row.sum}</Col>
                            </div>
                            <Divider />
                        </>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
