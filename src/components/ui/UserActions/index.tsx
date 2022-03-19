import React, { useCallback } from 'react';

import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@components/ui';

import styles from './UserAction.module.sass';

import {
    useProfile,
    useTranslation,
    useAuth
} from '@hooks';

interface IUserActions {};

export const UserActions: React.FC<IUserActions> = () => {
    const { t, language } = useTranslation();
    const { getFullname, getInitials } = useProfile();
    const { logout } = useAuth();

    const navigate = useNavigate();

    const getUsername = useCallback(() => {
        const name: string = getFullname();
        const initials: string = getInitials(t(name));

        if (name === 'user') return (<div>{t('User')}</div>);

        return (
            <span>
                <span className={styles.userInitials}><span>{initials}</span></span>
                <span className={styles.userName}>{t(name)}</span>
            </span>
        );
    }, [language])
    
    return (
        <NavDropdown title={getUsername()}>
            <NavDropdown.Item onClick={() => navigate('/settings')}>
                <span className={styles.dropdownMenuItem}><Icon name="settings"/>{t('Settings')}</span>
            </NavDropdown.Item>
            <NavDropdown.Item onClick={logout} >
                <span className={styles.dropdownMenuItem}><Icon name="logout"/>{t('Logout')}</span>
            </NavDropdown.Item>
        </NavDropdown>
    );
}
