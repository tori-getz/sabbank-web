
import React from 'react';

import {
    Modal,
    Icon,
    Divider,
    Button
} from '@components/ui';

import { useTranslation } from '@hooks';

import styles from './DepositCreateConfirm.module.sass';

interface IDepositCreateConfirm {
    visible: boolean
    onClose: () => any
    loading: boolean
    // onConfirm: () => any
}

interface ITable {
    name: string
    value: string
}

export const DepositCreateConfirm: React.FC<IDepositCreateConfirm> = ({
    visible,
    onClose,
    loading
}) => {
    const { t } = useTranslation();

    const info: Array<ITable> = [
        {
            name: t('Cryptocurrency'),
            value: 'adjjda'
        },
        {
            name: t('Term'),
            value: 'adjjda'
        },
        {
            name: t('Percent'),
            value: 'adjjda'
        },
        {
            name: 'aklal',
            value: 'adjjda'
        },
    ];

    return (
        <Modal
            visible={visible}
            onClose={onClose}
        >
            <div className='p-4'>
                <div className={styles.header}>
                    <h4>{t('Deposit')}</h4>
                    <div
                        className={styles.close}
                        onClick={onClose}
                    >
                        <Icon
                            name='close'
                        />
                    </div>
                </div>
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
                    />
                    <button
                        className={styles.cancel}
                        onClick={onClose}
                    >
                        {t('Cancel')}
                    </button>
                </div>
            </div>
        </Modal>
    )
}
