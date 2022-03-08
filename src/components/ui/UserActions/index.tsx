
import React from 'react';

import { NavDropdown } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import {
    useProfile,
    useTranslation,
    useAuth
} from '@hooks';

interface IUserActions {};

export const UserActions: React.FC<IUserActions> = () => {
    const { t } = useTranslation();
    const { getFullname } = useProfile();
    const { logout } = useAuth();

    const navigate = useNavigate();

    return (
        <NavDropdown title={getFullname()}>
            <NavDropdown.Item onClick={() => navigate('/settings')}>
                {t('Settings')}
            </NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>
                {t('Logout')}
            </NavDropdown.Item>
        </NavDropdown>
    );
}
