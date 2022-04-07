
import React from 'react';

import Drawer from 'react-modern-drawer';

import useWindowDimensions from 'use-window-dimensions';
import {
    useLocation,
    useNavigate
} from 'react-router-dom';

import styles from './NavDrawer.module.sass';

import {
    NavDrawerHeader,
    NavDrawerLink,
    Icon,
} from '@components/ui';

import {
    useTranslation,
    useAuth
} from '@hooks';

interface ILink {
    to: string
    title: string
}

interface INavDrawer {
    expanded: boolean
    onClose: () => any
    links?: Array<ILink>
}

export const NavDrawer: React.FC<INavDrawer> = ({
    expanded,
    onClose,
    links = []
}) => {
    const { width } = useWindowDimensions();

    const location = useLocation();
    const navigate = useNavigate();

    const { t } = useTranslation();

    const {
        logout,
        isAuth
    } = useAuth();

    return (
        <Drawer
            open={expanded}
            onClose={onClose}
            direction='left'
            size={width * 0.8}
            overlayColor='transparent'
        >
            <div className={styles.wrapper}>
                <NavDrawerHeader />
                <div className={styles.body}>
                    <div className={styles.spacer} />
                    <div className={styles.line} />
                    <div className={styles.links}>
                        {links.map((link: ILink, key: number) => (
                            <NavDrawerLink
                                key={key}
                                title={link.title}
                                active={location.pathname === link.to}
                                onClick={() => navigate(link.to)}
                            />
                        ))}
                    </div>
                </div>
                {isAuth() && (
                    <div className={styles.controlsContainer}>
                        <a onClick={() => navigate('/settings')}><span><Icon name="settings"/> {t('Settings')}</span></a>
                        <a onClick={logout}><span><Icon name="logout"/> {t('Logout')}</span></a>
                    </div>
                )}
            </div>
        </Drawer>
    )
}
