
import React, { useState, useEffect } from 'react';

import { useTranslation, useDeposit } from '@hooks';

import { ScreenContainer } from '@containers';

import { GoBack } from '@components/ui';

import { useNavigate, useParams } from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism';

import type {
    IDepositGroup,
    IDeposit
} from '@typing';

import { isEmpty } from 'lodash';

interface IDepositInfoScreen {};

export const DepositInfoScreen: React.FC<IDepositInfoScreen> = () => {
    const navigate = useNavigate();
    const { id: depositId } = useParams();

    const { t, language } = useTranslation();
    const { depositList, getDeposits, getGroupByDepositId } = useDeposit();

    const [ group, setGroup ] = useState<IDepositGroup>({
        name_en: '',
        name_ru: '',
        percentage: 0,
        data: []
    });
    const [ deposit, setDeposit ] = useState<IDeposit>(null);

    useEffect(() => {
        if (isEmpty(depositList)) {
            getDeposits();
            return;
        }

        setGroup(getGroupByDepositId(depositId));
    }, [depositList]);

    useEffect(() => {
        if (!group) return;

        for (let deposit of group.data) {
            if (deposit.id === depositId) return setDeposit(deposit);
        }
    }, [group]);

    return (
        <ScreenContainer>
            <GoBack
                onClick={() => navigate(-1)}
            />
            <h2>{group[`name_${language}`]} ({group.percentage}%)</h2>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        {depositId}
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
