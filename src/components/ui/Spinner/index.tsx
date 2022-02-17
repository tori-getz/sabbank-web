
import React from 'react';

import { Spinner as Loader } from 'react-bootstrap';

import styles from './Spinner.module.sass';

interface ISpinner {
    variant?: 'primary' | 'light' | 'dark'
}

export const Spinner: React.FC<ISpinner> = ({
    variant = 'primary'
}) => {
    return (
        <div className={styles.wrapper}>
            <Loader
                variant={variant}
                animation='border'
            >
                <span className="visually-hidden">Loading...</span>
            </Loader>
        </div>
    )
}
