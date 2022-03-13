
import React, { useState } from 'react';

import { useTranslation } from '@hooks';
import { useNavigate, useLocation } from 'react-router-dom';

import { ScreenContainer } from '@containers';

import type {
    ICredit,
    CreditRepaymentType
} from '@typing';

import {
    GoBack,
    CurrencyAmount,
    Button,
    Details
} from '@components/ui';

import {
    CreditRepayment
} from '@components';

import { Card, CardContent } from 'ui-neumorphism';

import { moneyAmountFormatter } from '@utils';

interface ILocationState {
    credit: ICredit
}

interface ICreditRepaymentScreen {};

export const CreditRepaymentScreen: React.FC<ICreditRepaymentScreen> = () => {
    const { t } = useTranslation();

    const [ paymentType, setPayemntType ] = useState<CreditRepaymentType>('scheduled');
    const [ repaymentVisible, setRepaymentVisible ] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();

    const { credit } = location.state as ILocationState;

    return (
        <ScreenContainer title={t('Loan repayment')}>
            <GoBack onClick={() => navigate(-1)} />
            <h2>{t('Loan repayment')}</h2>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        <h4>{`${t('Credit')} №${credit.number}`}</h4>
                        <Details
                            items={[
                                {
                                    name: t('Loan body'),
                                    value: `${moneyAmountFormatter(credit.amount, 8)} USDT`
                                },
                                {
                                    name: t('Remaining % of charges'),
                                    value: `${moneyAmountFormatter(credit.close_price * credit.rate, 8)} USDT`
                                },
                                {
                                    name: t('Balance of the loan body'),
                                    value: `${moneyAmountFormatter(credit.close_price, 8)} USDT`
                                }
                            ]}
                        />
                        <h5 className='mt-5'>{t('Scheduled payment')}</h5>
                        <CurrencyAmount
                            amount={moneyAmountFormatter(credit.active_payment?.amount, 8)}
                            asset='USDT'
                        >
                            <Button
                                label={t('Pay')}
                                onClick={() => {
                                    setPayemntType('scheduled');
                                    setRepaymentVisible(true);
                                }}
                            />
                        </CurrencyAmount>
                        <h5 className='mt-5'>{t('Full repayment')}</h5>
                        <CurrencyAmount
                            amount={moneyAmountFormatter(credit.close_price, 8)}
                            asset='USDT'
                        >
                            <Button
                                label={t('Pay')}
                                onClick={() => {
                                    setPayemntType('full');
                                    setRepaymentVisible(true);
                                }}
                            />
                        </CurrencyAmount>
                    </div>
                </CardContent>
            </Card>
            <CreditRepayment
                visible={repaymentVisible}
                onClose={() => setRepaymentVisible(false)}
                credit={credit}
                paymentType={paymentType}
            />
        </ScreenContainer>
    );
}
