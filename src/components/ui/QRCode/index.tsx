
import React from 'react';

import QRCodeWrapper from 'react-qr-code';

interface IQRCode {
    text: string
    className?: string
    size?: number
}

export const QRCode: React.FC<IQRCode> = ({
    text,
    className,
    size = 256
}) => {
    return (
        <div className={className}>
            <QRCodeWrapper
                fgColor='#5C14F1'
                value={text}
                size={size}
            />
        </div>
    )
}
