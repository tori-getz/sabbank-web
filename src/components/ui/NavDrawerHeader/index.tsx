
import React from 'react';

import styles from './NavDrawerHeader.module.sass';

import {
    useTranslation,
    useProfile
} from '@hooks';

interface INavDrawerHeader {};

export const NavDrawerHeader: React.FC<INavDrawerHeader> = () => {
    const { t } = useTranslation();
    const {
        getFullname,
        getInitials
    } = useProfile();

    const fullName: string = getFullname() === 'user' ? t('User') : getFullname();
    const initials = getInitials(fullName);

    return (
        <div className={styles.header}>
            <div className={styles.initials}>{initials}</div>
            <div className={styles.fullname}>{fullName}</div>
        </div>
    )
}
