
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

interface IDepositGroup {
    group: IDepositGroupData
}

export const DepositGroup: React.FC<IDepositGroup> = ({
    group
}) => {
    const { language, t } = useTranslation();

    return (
        <>
            <h2>{group[`name_${language}`]} ({group.percentage}%)</h2>
            {group.data.map((deposit: IDeposit, key: number) => (
                <DepositListItem
                    {...deposit}
                    onClick={() => alert('lol')}
                />
            ))}
            <Divider className='mt-4 mb-4' />
        </>
    )
}
