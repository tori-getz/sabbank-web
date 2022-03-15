
import React from 'react';

import { useTranslation } from '@hooks';

import {
    Modal,
    Button,
    Details
} from '@components/ui';

import styles from './ConfirmModal.module.sass';

interface ITableItem {
    name: string
    value: string
}

interface IConfirmModal {
    label: string
    table: Array<ITableItem>
    visible: boolean
    onClose: () => any
    onConfirm?: () => any
    loading?: boolean
}

export const ConfirmModal: React.FC<IConfirmModal> = ({
    visible,
    onClose,
    label,
    loading,
    onConfirm,
    table
}) => {
    const { t } = useTranslation();

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title={label}
        >
            <Details
                items={table}
            />
            <div className={styles.btns}>
                <Button
                    label={t('Confirm')}
                    onClick={onConfirm}
                    loading={loading}
                />
                <div
                    className={styles.cancel}
                    onClick={onClose}
                >
                    {t('Cancel')}
                </div>
            </div>
        </Modal>
    )
}
