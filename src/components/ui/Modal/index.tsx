
import React, { Children } from 'react';

import ReactModal from 'react-modal';

import styles from './Modal.module.sass';

ReactModal.setAppElement('#root');

interface IModal {
    visible: boolean
    onClose: () => any,
    children?: React.ReactNode
}

export const Modal: React.FC<IModal> = ({
    visible,
    onClose,
    children
}) => {
    return (
        <ReactModal
            isOpen={visible}
            onRequestClose={onClose}
            className={styles.modal}
        >
            {children}
        </ReactModal>
    );
}

