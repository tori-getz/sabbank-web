
import React from 'react';

import type {
    IWalletCurrency
} from '@typing';

import {
    useProfile,
    useTranslation
} from '@hooks';

import {
    Icon,
    QRCode,
    Label,
    TextInput
} from '@components/ui';

import { WalletActions } from '@components';

import {
    IconButton,
    Card,
    CardContent
} from 'ui-neumorphism';

import { moneyAmountFormatter } from '@utils';

import styles from './WalletInfo.module.sass';

interface IWalletInfo {
    crypto: IWalletCurrency
}

export const WalletInfo: React.FC<IWalletInfo> = ({
    crypto
}) => {
    const { t } = useTranslation();

    const { settings } = useProfile();

    return (
        <>
            <div className='d-flex align-items-center'>
                <IconButton
                    size='large'
                    text={false}
                    color=''
                    rounded
                    className='mr-5'
                >
                    <Icon
                        name={crypto.asset}
                        size={20}
                    />
                </IconButton>
                <div className={styles.currencyDescription}>
                    <div>{moneyAmountFormatter(crypto.balance, 8)} {crypto.asset.toUpperCase()}</div>
                    <div className={styles.fiatBalance}>{settings?.fiat_currency.symbol}{moneyAmountFormatter(crypto.balance * crypto.price[settings?.fiat_currency?.iso_code], 2)}</div>
                </div>
            </div>
            <WalletActions id={crypto.id} />
            <h4 className='mt-4'>{t('Wallet address')}</h4>
            <div className='d-flex mt-4'>
                <Card>
                    <CardContent>
                        <QRCode
                            text={crypto.address || ''}
                            size={180}
                        />
                    </CardContent>
                </Card>
                <div className={styles.address}>
                    <Label>{t('Copy wallet address to fund your account')}</Label>
                    <TextInput
                        disabled
                        value={crypto.address}
                    />
                </div>
            </div>
        </>
    )
}
