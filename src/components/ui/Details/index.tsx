

import React from 'react';

import { Label } from '@components/ui';

interface IDetail {
    name: string
    value: string
}

interface IDetails {
    items: Array<IDetail>
    className?: string
}

export const Details: React.FC<IDetails> = ({
    items,
    className
}) => {
    return (
        <div className={className}>
            {items.map(({ name, value }: IDetail, key: number) => (
                <div
                    className='d-flex justify-content-between'
                    key={key}
                >
                    <Label>{name}</Label>
                    <p>{value}</p>
                </div>
            ))}
        </div>
    );
}