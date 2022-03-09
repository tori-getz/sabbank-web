
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
    NavDrawerLink
} from '@components/ui';

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
                                title={link.title}
                                active={location.pathname === link.to}
                                onClick={() => navigate(link.to)}
                            />
                        ))}
                    </div>
                </div>
                <div className="p-5">Settings</div>
            </div>
        </Drawer>
    )
}
