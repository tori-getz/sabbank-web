
import React, { Children } from 'react';

import ReactModal from 'react-modal';

import { Icon } from '@components/ui';

import styles from './Modal.module.sass';
import cn from 'classnames';

ReactModal.setAppElement('#root');

interface IModal {
    visible: boolean
    onClose: () => any,
    children?: React.ReactNode
    title?: string
    className?: string
}

export const Modal: React.FC<IModal> = ({
    visible,
    onClose,
    children,
    title,
    className
}) => {
    return (
        <ReactModal
            isOpen={visible}
            onRequestClose={onClose}
            className={cn(styles.modal, className)}
        >
            <div className='p-4'>
                {title && (
                    <div className='d-flex align-items-top justify-content-between mb-3'>
                        <div className="widgetTitleL">{title}</div>
                        <div
                            className={styles.close}
                            onClick={onClose}
                        >
                            <Icon
                                name='close'
                            />
                        </div>
                    </div>
                )}
                {children}
            </div>
        </ReactModal>
    );
}

