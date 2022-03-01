
import React from 'react';

import { NavDropdown } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import {
    useUser,
    useTranslation,
    useAuth
} from '@hooks';

interface IUserActions {};

export const UserActions: React.FC<IUserActions> = () => {
    const { t } = useTranslation();
    const { user } = useUser();
    const { logout } = useAuth();

    const navigate = useNavigate();

    const getUsername = () => {
        const name: string = `${user?.first_name} ${user?.last_name}`;

        if (name === ' ') return t('User');

        return name;
    }

    return (
        <NavDropdown title={getUsername()}>
            <NavDropdown.Item onClick={() => navigate('/settings')}>
                {t('Settings')}
            </NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>
                {t('Logout')}
            </NavDropdown.Item>
        </NavDropdown>
    );
}
