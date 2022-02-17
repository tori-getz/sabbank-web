import React from 'react';

import { Navbar as BootstrapNavbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import cn from 'classnames';
import styles from './Navbar.module.sass';

import { LinkContainer } from 'react-router-bootstrap';

import { useTranslation } from '@hooks';

import { LanguageSelect } from '@components/ui';

interface INavbar {};

interface ILink {
    to: string
    title: string
}

export const Navbar: React.FC<INavbar> = () => {
    const { t } = useTranslation();

    const authorizedLinks: Array<ILink> = [
        { to: '/dashboard', title: t('Home') },
        { to: '/deposit', title: t('Deposit') },
        { to: '/credit', title: t('Credit') },
        { to: '/card', title: t('Card') }
    ]

    const renderLinks = () => {
        return (
            <>
                {authorizedLinks.map((link: ILink, key: number) => (
                    <LinkContainer to={link.to}>
                        <Nav.Link>{link.title}</Nav.Link>
                    </LinkContainer>
                ))}
                <LanguageSelect />
            </>
        )
    }

    return (
        <BootstrapNavbar expand="lg" className={cn(styles.navbar)}>
            <Container>
                <BootstrapNavbar.Brand href="/">
                    <img src="/assets/img/logo.svg" alt=""/>
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        {renderLinks()}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>            

    )
};