
import React, { useEffect, useState } from 'react';

import {
    useTranslation,
    useCredit
} from '@hooks';

import { ScreenContainer } from '@containers';
import { useNavigate, useLocation } from 'react-router-dom';

import {
    GoBack,
    Spinner
} from '@components/ui';

import type {
    ICreditRepaymentSchedule,
    ICredit
} from '@typing';

import {
    CreditScheduleItem
} from '@components';

import { Card, CardContent } from 'ui-neumorphism';

interface ILocationState {
    credit: ICredit
}

interface ICreditScheduleScreen {};

export const CreditScheduleScreen: React.FC<ICreditScheduleScreen> = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();

    const [ schedule, setSchedule ] = useState<ICreditScheduleScreen[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);

    const {
        getSchedule
    } = useCredit();

    const { credit } = location.state as ILocationState;

    const getData = async () => {
        try {
            setLoading(true);
            const schedule = await getSchedule({ id: credit.id });
    
            setSchedule(schedule);
        } catch (e) {
            console.error(e);
            navigate('/credit');
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        try {
            getData();
        } catch (e) {
            console.error(e);
            navigate('/credit');
        }
    } ,[]);

    if (loading) {
        return (
            <ScreenContainer title={t('Loan repayment')}>
                <Spinner />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer title={t('Loan repayment')}>
            <GoBack onClick={() => navigate(-1)} />
            <h2>{t('Loan repayment')}</h2>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        {schedule.map((s: ICreditRepaymentSchedule, key: number) => (
                            <CreditScheduleItem
                                item={s}
                                disabled={s.id !== credit?.active_payment?.id}
                                onClick={() => {
                                    navigate(`/credit/repayment`, {
                                        state: {
                                            credit,
                                            paymentId: s.id
                                        }
                                    });
                                }}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    );
}
