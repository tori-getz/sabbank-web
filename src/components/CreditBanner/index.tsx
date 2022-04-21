
import React from 'react';

import { IconButton, Card, CardContent } from 'ui-neumorphism';
import { useTranslation } from '@hooks';

import { Icon, Button } from '@components/ui';

import styles from './CreditBanner.module.sass';
import cn from 'classnames';

import { useNavigate } from 'react-router-dom';

interface ICreditBanner {};

interface IWalletCurrency {
    asset: string
    name: string
    percentage: number
}

export const CreditBanner: React.FC<ICreditBanner> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const headerCheck: Array<string> = [
        'Minimum interest rate',
        'No credit check is required'
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
            <div className={cn(styles.header, 'p-md-5 p-4')}>
                <h3>{t('Get a loan stright to your crypto wallet')}</h3>
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
                            <div className='d-none d-md-block'>
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
                            <div className={styles.headerCheckText}>{t(text)}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='p-md-5 p-4 d-flex justify-content-center'>
                <Button
                    label={t('Apply new credit')}
                    onClick={() => navigate('/credit/apply')}
                />
            </div>
        </div>
    )
}
