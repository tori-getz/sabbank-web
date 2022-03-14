
import React, { useState } from 'react';

import {
    Modal,
    Label,
    RadioItem,
    Details,
    Button
} from '@components/ui';

import { useTranslation } from '@hooks';

import type {
    CreditRepaymentType,
    ICredit,
    ICreditPaymentInfo,
    CreditPaymentMethod
} from '@typing';

import { moneyAmountFormatter } from '@utils';

interface IPaymentMethod {
    label: string
    amount: string
    value: CreditPaymentMethod
}

interface ICreditRepayment {
    visible: boolean
    loading: boolean
    onClose: () => any
    credit: ICredit
    info: ICreditPaymentInfo
    paymentType: CreditRepaymentType
    onSubmit: (method: CreditPaymentMethod) => any
};

export const CreditRepayment: React.FC<ICreditRepayment> = ({
    visible,
    onClose,
    info,
    loading,
    credit,
    paymentType,
    onSubmit
}) => {
    const { t } = useTranslation();

    const [ paymentMethod, setPaymentMethod ] = useState<CreditPaymentMethod>();
    const [ buttonLabel, setButtonLabel ] = useState<string>(t('Pay'))

    const paymentMethods: Array<IPaymentMethod> = [
        {
            label: 'Валюта кредита',
            amount: `${moneyAmountFormatter(info?.amount_usdt, 8)} USDT`,
            value: 'wallet'
        },
        {
            label: 'С помощью залога',
            amount: `${moneyAmountFormatter(info?.amount_deposit, 8)} ${info?.deposit_currency}`,
            value: 'deposit'
        }
    ];

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title={paymentType === 'scheduled' ? t('Scheduled payment') : t('Full repayment')}
        >
            <Label>{t('Payment method')}</Label>
            {paymentMethods.map(({ label, amount, value }: IPaymentMethod, key: number) => (
                <RadioItem
                    active={paymentMethod === value}
                    label={label}
                    amount={amount}
                    key={key}
                    onClick={() => {
                        setButtonLabel(`${t('Pay')} ${amount}`)
                        setPaymentMethod(value)
                    }}
                />
            ))}
            <Details
                items={[
                    {
                        name: t('Loan body'),
                        value: `${moneyAmountFormatter(info?.loan_body, 8)} USDT`
                    },
                    {
                        name: t('Balance of the loan body'),
                        value: `${moneyAmountFormatter(credit?.close_price, 8)} USDT`
                    },
                    {
                        name: t('Remaining % of charges'),
                        value: `${moneyAmountFormatter(credit?.close_price * credit?.rate, 8)} USDT`
                    }
                ]}
            />
            <Button
                className='w-100 mt-4'
                label={buttonLabel}
                loading={loading}
                disabled={!paymentMethod}
                onClick={() => onSubmit(paymentMethod)}
            />
        </Modal>
    )
}