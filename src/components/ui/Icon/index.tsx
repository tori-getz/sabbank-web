import React from 'react';

interface IIcon {
    name: string
    size: number
};

export const Icon: React.FC<IIcon> = props => {
    return (
        <img 
            src={`/assets/icons/${props.name}.svg`} 
            width={`${props.size}px`} 
            height={`${props.size}px`} 
        />
    )
}