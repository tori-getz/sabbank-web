
import React from 'react';

import {
    Modal,
    Icon,
    Button
} from '@components/ui';

interface ICreditAgreement {
    visible: boolean
    onClose: () => any
}

export const CreditAgreement: React.FC<ICreditAgreement> = ({
    visible,
    onClose
}) => {
    return (
        <Modal
            visible={visible}
            onClose={onClose}
        >
            <h1>credit agree</h1>
        </Modal>
    )
}
