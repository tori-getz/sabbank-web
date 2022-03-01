import React from 'react';

import { Navbar as BootstrapNavbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import cn from 'classnames';

import { LinkContainer } from 'react-router-bootstrap';

import { useTranslation, useAuth } from '@hooks';
import { useNavigate } from 'react-router-dom';

import { LanguageSelect, UserActions, Button } from '@components/ui';
import styles from './Navbar.module.sass';


interface INavbar {};

interface ILink {
    to: string
    title: string
}

export const Navbar: React.FC<INavbar> = () => {
    const { t } = useTranslation();
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    const authorizedLinks: Array<ILink> = [
        { to: '/dashboard', title: t('Home') },
        { to: '/deposit', title: t('Deposit') },
        { to: '/credit', title: t('Credit') },
        { to: '/card', title: t('Card') }
    ]

    const unauthorizedLinks: Array<ILink> = [
        { to: '/', title: t('About') },
        { to: '/', title: t('Features') },
        { to: '/', title: t('Benefits') },
        { to: '/', title: 'FAQS' },
        { to: '/', title: t('Contact') }
    ];

    const renderLinks = () => {
        if (!isAuth()) {
            return (
                <>
                    {unauthorizedLinks.map((link: ILink, key: number) => (
                        <LinkContainer
                            to={link.to}
                            key={key}
                        >
                            <Nav.Link>{link.title}</Nav.Link>
                        </LinkContainer>
                    ))}
                    <LanguageSelect />
                    <div className="navbar-nav">
                        <LinkContainer
                            to="/login"
                        >                        
                            <Nav.Link>{t('Sign IN')}</Nav.Link>
                        </LinkContainer>
                    </div>
                    <Button onClick={() => navigate('/register')} label={t('Sign up')} className={styles.buttonSignUp}/>
                </>
            )
        }

        return (
            <>
                {authorizedLinks.map((link: ILink, key: number) => (
                    <LinkContainer
                        to={link.to}
                        key={key}
                    >
                        <Nav.Link>{link.title}</Nav.Link>
                    </LinkContainer>
                ))}
                <LanguageSelect />
                <UserActions />
            </>
        )
    }

    return (
        <BootstrapNavbar expand="lg" className={cn(styles.navbar)}>
            <Container>
                <BootstrapNavbar.Brand href="/">
                    <img src="/assets/img/logo.svg" alt="SabBank"/>
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