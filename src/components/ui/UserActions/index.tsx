import React from 'react';

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
    const { t } = useTranslation();
    const { getFullname, getInitials } = useProfile();
    const { logout } = useAuth();

    const navigate = useNavigate();

    const getUsername = () => {
        const name: string = getFullname();
        const initials: string = getInitials(name);

        if (name === ' ') return (<div>{t('User')}</div>);

        return (
            <span>
                <span className={styles.userInitials}><span>{initials}</span></span>
                <span className={styles.userName}>{name}</span>
            </span>
        );
    }
    
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
