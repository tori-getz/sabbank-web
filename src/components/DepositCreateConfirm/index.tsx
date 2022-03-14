
import React from 'react';

import {
    Modal,
    Icon,
    Divider,
    Button
} from '@components/ui';

import { useTranslation } from '@hooks';

import type {
    iCurrency,
    IDepositSettingCurrency,
    IDepositSettingCurrencyPeriod
} from '@typing';

import styles from './DepositCreateConfirm.module.sass';

interface IDepositCreateConfirm {
    currency: IDepositSettingCurrency
    period: IDepositSettingCurrencyPeriod
    amount: string
    selectedWallet: iCurrency
    visible: boolean
    onClose: () => any
    loading: boolean
    onConfirm: () => any
}

interface ITable {
    name: string
    value: string
}

export const DepositCreateConfirm: React.FC<IDepositCreateConfirm> = ({
    visible,
    onClose,
    currency,
    period,
    selectedWallet,
    amount,
    onConfirm,
    loading
}) => {
    const { t, language } = useTranslation();

    const info: Array<ITable> = [
        {
            name: t('Cryptocurrency'),
            value: currency?.name
        },
        {
            name: t('Term'),
            value: period?.depositPeriod[`name_${language}`] || ''
        },
        {
            name: t('Percent'),
            value: `${period?.percentage}%`
        },
        {
            name: t('Deposit amount'),
            value: `${amount} ${selectedWallet.asset.toUpperCase()}`
        },
    ];

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title={t('Deposit')}
        >
            <div className='pt-3'>
                {info.map(({ name, value }: ITable, key: number) => (
                    <div
                        key={key}
                        className={styles.row}
                    >
                        <div className={styles.rowLabel}>{name}</div>
                        <div className={styles.rowValue}>{value}</div>
                    </div>
                ))}
            </div>
            <Divider className='mt-3 mb-3' />
            <div className={styles.actions}>
                <Button
                    label={t('Confirm')}
                    loading={loading}
                    onClick={onConfirm}
                />
                <button
                    className={styles.cancel}
                    onClick={onClose}
                >
                    {t('Cancel')}
                </button>
            </div>
        </Modal>
    )
}
