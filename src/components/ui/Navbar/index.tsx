import React from 'react';

import { Navbar as BootstrapNavbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import cn from 'classnames';
import styles from './Navbar.module.sass';

import { LinkContainer } from 'react-router-bootstrap';

import { useTranslation } from '@hooks';

import { LanguageSelect } from '@components/ui';

interface INavbar {};

export const Navbar: React.FC<INavbar> = () => {
    const { t } = useTranslation();

    const renderLinks = () => {
        return (
            <>
                <LinkContainer to='/dashboard'>
                    <Nav.Link>{t('Home')}</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/deposit'>
                    <Nav.Link>{t('Deposit')}</Nav.Link>
                </LinkContainer>
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
                        <LanguageSelect />
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>            

    )
};