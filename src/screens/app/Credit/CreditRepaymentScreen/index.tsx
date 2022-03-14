
import React, { useState } from 'react';

import { useTranslation } from '@hooks';
import { useNavigate, useLocation } from 'react-router-dom';

import { ScreenContainer } from '@containers';

import type {
    ICredit,
    CreditRepaymentType,
    ICreditPaymentInfo,
    CreditPaymentMethod
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

import { CreditService } from '@services';

interface ILocationState {
    credit: ICredit,
    paymentId?: string
}

interface ICreditRepaymentScreen {};

export const CreditRepaymentScreen: React.FC<ICreditRepaymentScreen> = () => {
    const { t } = useTranslation();

    const creditService = new CreditService();

    const [ paymentType, setPayemntType ] = useState<CreditRepaymentType>('scheduled');
    const [ repaymentVisible, setRepaymentVisible ] = useState<boolean>(false);
    const [ repaymentLoading, setRepaymentLoading ] = useState<boolean>(false);

    const [ info, setInfo ] = useState<ICreditPaymentInfo>();

    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as ILocationState;
    const { credit } = state;

    const onSelect = async (type: CreditRepaymentType) => {
        if (type === 'full') {
            const closeInfo = await creditService.getCloseInfo({
                id: credit.id
            });
    
            setInfo(closeInfo);
        }

        if (type === 'scheduled') {
            const paymentInfo = await creditService.getPaymentInfo({
                id: credit.id,
                payment_id: state?.paymentId || credit?.active_payment?.id
            });

            setInfo(paymentInfo);
        }

        setPayemntType(type);
        setRepaymentVisible(true);
    }

    const onSubmit = async (method: CreditPaymentMethod) => {
        try {
            setRepaymentLoading(true);

            if (paymentType === 'full') {
                await creditService.close({
                    id: credit.id,
                    method
                })
            }

            if (paymentType === 'scheduled') {
                await creditService.pay({
                    id: credit.id,
                    payment_id: state?.paymentId || credit?.active_payment?.id,
                    method
                });
            }

            navigate(`/credit/${credit.id}`);

            alert(method);
        } catch (e) {
            console.error(e);
        } finally {
            setRepaymentLoading(false);
        }
    }

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
                                onClick={() => onSelect('scheduled')}
                            />
                        </CurrencyAmount>
                        <h5 className='mt-5'>{t('Full repayment')}</h5>
                        <CurrencyAmount
                            amount={moneyAmountFormatter(credit.close_price, 8)}
                            asset='USDT'
                        >
                            <Button
                                label={t('Pay')}
                                onClick={() => onSelect('full')}
                            />
                        </CurrencyAmount>
                    </div>
                </CardContent>
            </Card>
            <CreditRepayment
                loading={repaymentLoading}
                visible={repaymentVisible}
                onClose={() => setRepaymentVisible(false)}
                credit={credit}
                info={info}
                onSubmit={onSubmit}
                paymentType={paymentType}
            />
        </ScreenContainer>
    );
}
