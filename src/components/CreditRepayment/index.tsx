
import React from 'react';

import {
    Modal
} from '@components/ui';

import { useTranslation } from '@hooks';

import type {
    CreditRepaymentType,
    ICredit
} from '@typing';

interface ICreditRepayment {
    visible: boolean
    onClose: () => any
    credit: ICredit
    paymentType: CreditRepaymentType
};

export const CreditRepayment: React.FC<ICreditRepayment> = ({
    visible,
    onClose,
    credit,
    paymentType
}) => {
    const { t } = useTranslation();

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title={paymentType === 'scheduled' ? t('Scheduled payment') : t('Full repayment')}
        >
            {credit.id}
        </Modal>
    )
}