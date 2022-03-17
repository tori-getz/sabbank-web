
import React from 'react';

import { IconButton, Card, CardContent } from 'ui-neumorphism';

import { Icon, Button } from '@components/ui';

import styles from './DepositBanner.module.sass';
import cn from 'classnames';

import { useNavigate } from 'react-router-dom';

interface IDepositBanner {};

interface IWalletCurrency {
    asset: string
    name: string
    percentage: number
}

export const DepositBanner: React.FC<IDepositBanner> = () => {
    const navigate = useNavigate();

    const headerCheck: Array<string> = [
        'Заработок будет зачисляться на ваш кошелек каждые 7 дней',
        'Заработок выплачивается в той же валюте, что и ваш вклад'
    ];

    const currencies: Array<IWalletCurrency> = [
        {
            name: 'Bitcoin',
            asset: 'btc',
            percentage: 10
        },
        {
            asset: 'usdt',
            name: 'Tether',
            percentage: 20
        }
    ];

    return (
        <div className={styles.wrapper}>
            <div className={cn(styles.header, 'p-5 pb-4')}>
                <h3>Зарабатывай до 20% годовых на своих криптоактивах</h3>
                <div className={styles.currenciesBlock}>
                    {currencies.map((currency: IWalletCurrency, key: number) => (
                        <div
                            className={styles.currency}
                            key={key}
                        >
                            <IconButton
                                size='large'
                                text={false}
                                color=''
                                className='m-2'
                                rounded
                            >
                                <Icon
                                    name={currency.asset}
                                    size={20}
                                />
                            </IconButton>
                            <div>
                                <div className={styles.currencyName}>{currency.name}</div>
                                <div className={styles.currencyAsset}>{currency.asset.toUpperCase()}</div>
                            </div>
                            <div className={styles.currencyPercent}>{currency.percentage}%</div>
                        </div>
                    ))}
                </div>
                <div className={styles.headerChecks}>
                    {headerCheck.map((text: string, key: number) => (
                        <div
                            className={styles.headerCheck}
                            key={key}
                        >
                            <Icon name='check-white' />
                            <div className={styles.headerCheckText}>{text}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='p-5 d-flex justify-content-center'>
                <Button
                    label='Открыть вклад'
                    onClick={() => navigate('/deposit/new')}
                />
            </div>
        </div>
    )
}
