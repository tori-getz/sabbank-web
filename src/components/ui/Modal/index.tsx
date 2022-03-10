
import React, { Children } from 'react';

import ReactModal from 'react-modal';

import { Icon } from '@components/ui';

import styles from './Modal.module.sass';

ReactModal.setAppElement('#root');

interface IModal {
    visible: boolean
    onClose: () => any,
    children?: React.ReactNode
    title?: string
}

export const Modal: React.FC<IModal> = ({
    visible,
    onClose,
    children,
    title
}) => {
    return (
        <ReactModal
            isOpen={visible}
            onRequestClose={onClose}
            className={styles.modal}
        >
            <div className='p-4'>
                {title && (
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <h3>{title}</h3>
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

