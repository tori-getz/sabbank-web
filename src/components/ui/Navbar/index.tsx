import React from 'react';

import { Navbar as BootstrapNavbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import cn from 'classnames';
import styles from './Navbar.module.sass';

import { locales } from '@locale';

import { useTranslation } from '@hooks';

interface INavbar {};

export const Navbar: React.FC<INavbar> = () => {
    const { language, setLanguage, t } = useTranslation();

    const languages: Array<string> = Object.keys(locales);

    return (
        <BootstrapNavbar expand="lg" className={cn(styles.navbar)}>
            <Container>
                <BootstrapNavbar.Brand href="#home">
                    <img src="/assets/img/logo.svg" alt=""/>
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#home">{t('Home')}</Nav.Link>
                        <Nav.Link href="#link">{t('Deposit')}</Nav.Link>
                        <NavDropdown title={language.toUpperCase()} id="basic-nav-dropdown">
                            {languages.map((lang: string, key: number) => (
                                <NavDropdown.Item
                                    onClick={() => setLanguage(lang)}
                                    key={key}
                                >
                                    {lang.toUpperCase()}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>            

    )
};