
import React from 'react';

import {
    Modal
} from '@components/ui';

import styles from './TwoFactorModal.module.sass';

interface ITwoFactorModal {
    visible: boolean
    onClose: () => any
    onConfirm: () => any
}

export const TwoFactorModal: React.FC<ITwoFactorModal> = ({
    visible,
    onClose,
    onConfirm
}) => {
    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title={'2FA'}
            className={styles.modal}
        >
            2fa
        </Modal>
    )
}
