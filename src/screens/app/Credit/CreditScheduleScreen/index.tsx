
import React, { useEffect, useState } from 'react';

import {
    useTranslation,
    useCredit
} from '@hooks';

import { ScreenContainer } from '@containers';
import { useNavigate, useLocation } from 'react-router-dom';

import {
    GoBack
} from '@components/ui';

import type {
    ICreditRepaymentSchedule
} from '@typing';

import {
    CreditScheduleItem
} from '@components';

import { Card, CardContent } from 'ui-neumorphism';

interface ILocationState {
    id: string
}

interface ICreditScheduleScreen {};

export const CreditScheduleScreen: React.FC<ICreditScheduleScreen> = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();

    const [ schedule, setSchedule ] = useState<ICreditScheduleScreen[]>([]);

    const { getSchedule } = useCredit();

    const { id } = location.state as ILocationState;

    const getData = async () => {
        const schedule = await getSchedule({ id });

        setSchedule(schedule);
    }

    useEffect(() => {
        try {
            getData();
        } catch (e) {
            console.error(e);
            navigate('/credit');
        }
    } ,[]);

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
                                disabled={key !== 0}
                                onClick={() => alert(s.id)}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    );
}
