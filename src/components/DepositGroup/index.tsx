
import React from 'react';

import type {
    IDepositGroup as IDepositGroupData,
    IDeposit
} from '@typing';

import { useTranslation } from '@hooks';

import {
    Divider,
    DepositListItem
} from '@components/ui';

import { useNavigate } from 'react-router-dom';

interface IDepositGroup {
    group: IDepositGroupData
}

export const DepositGroup: React.FC<IDepositGroup> = ({
    group
}) => {
    const { language, t } = useTranslation();

    const navigate = useNavigate();

    return (
        <>
            <h2>{group[`name_${language}`]} ({group.percentage}%)</h2>
            {group.data.map((deposit: IDeposit, key: number) => (
                <DepositListItem
                    {...deposit}
                    onClick={() => navigate(`/deposit/${deposit.id}`)}
                />
            ))}
            <Divider className='mt-4 mb-4' />
        </>
    )
}
