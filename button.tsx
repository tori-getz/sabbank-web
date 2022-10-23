import React, { useState } from 'react';

export const RotateButton: React.FC = () => {
    const [ statusKey, setStatus ] = useState<number>(0);

    const statuses; Array<string> = [ 'btn', 'btn-primary', 'btn-warn' ];

    return (
        <button
            onClick={() => setStatus()}
        >
            rotate
        </button>
    )
}
