
import React from 'react';

import {
    Modal,
    Icon,
    Button,
    Details
} from '@components/ui';

import { useTranslation } from '@hooks';

import styles from './CreditAgreement.module.sass';

interface ICreditAgreement {
    visible: boolean
    onClose: () => any
    loanAmount: string
    maturityDate: string
    comission: string
    interestRate: string
    liquidationThreshold: string
    onAgree: () => any
    loading: boolean
}

export const CreditAgreement: React.FC<ICreditAgreement> = ({
    visible,
    onClose,
    loanAmount,
    maturityDate,
    comission,
    interestRate,
    liquidationThreshold,
    onAgree,
    loading
}) => {
    const { t } = useTranslation();

    return (
        <Modal
            visible={visible}
            onClose={onClose}
        >
            <div className='p-4 mx-2'>
                <div className='d-flex align-items-center justify-content-between'>
                    <h3>{t('Apply for a loan')}</h3>
                    <div
                        className={styles.close}
                        onClick={onClose}
                    >
                        <Icon name='close' />
                    </div>
                </div>
                <Details
                    className='mt-4 mb-4'
                    items={[
                        {
                            name: t('Loan amount'),
                            value: loanAmount
                        },
                        {
                            name: t('Maturity date'),
                            value: maturityDate
                        },
                        {
                            name: t('Comission'),
                            value: comission
                        },
                        {
                            name: t('Interest rate'),
                            value: interestRate
                        },
                        {
                            name: t('Liquidation threshold'),
                            value: liquidationThreshold
                        },
                        {
                            name: t('Commission payment method'),
                            value: 'Tether (USDT)'
                        }
                    ]}
                />
                <div className={styles.btns}>
                    <Button
                        label={t('Apply')}
                        className={styles.apply}
                        onClick={onAgree}
                        loading={loading}
                    />
                    <div
                        className={styles.cancel}
                        onClick={onClose}
                    >
                        {t('Cancel')}
                    </div>
                </div>
            </div>
        </Modal>
    )
}
