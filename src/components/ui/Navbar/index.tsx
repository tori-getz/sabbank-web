import React from 'react';

import { Navbar as BootstrapNavbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import cn from 'classnames';
import styles from './Navbar.module.sass';

interface INavbar {};

export const Navbar: React.FC<INavbar> = () => {
    return (
        <BootstrapNavbar expand="lg" className={cn(styles.navbar)}>
            <Container>
                <BootstrapNavbar.Brand href="#home">
                    <img src="/assets/img/logo.svg" alt=""/>
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#home">Главная</Nav.Link>
                        <Nav.Link href="#link">Вклад</Nav.Link>
                        <NavDropdown title="RU" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>            

    )
};