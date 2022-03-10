
import React, { useState } from 'react';

import {
    useTranslation
} from '@hooks';

import {
    Label,
    Modal,
    CurrencyInput,
    Button
} from '@components/ui';

import styles from './IncreaseCollateral.module.sass';

interface IIncreaseCollateral {
    visible: boolean
    onClose: () => any
    onAgree: (amount: number) => any
    asset: string
    loading: boolean
}

export const IncreaseCollateral: React.FC<IIncreaseCollateral> = ({
    visible,
    onClose,
    onAgree,
    asset,
    loading
}) => {
    const { t } = useTranslation();

    const [ amount, setAmount ] = useState<string>('');

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title={t('Increase in collateral')}
        >
            <Label>{t('Enter the depositamount')}</Label>
            <CurrencyInput
                value={amount}
                onChange={setAmount}
                assetFrom={asset}
            />
            <div className={styles.btns}>
                <Button
                    label={t('Agree')}
                    className='px-5'
                    disabled={!amount}
                    loading={loading}
                    onClick={() => {
                        onAgree(Number(amount))
                    }}
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
