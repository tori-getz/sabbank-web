
import React from 'react';

import { Container } from 'react-bootstrap';

import { ScreenContainer } from '@containers';
import { LoginForm } from '@components';
import { Navbar, Footer } from '@components/ui';

import styles from './LoginScreen.module.sass';

interface ILoginScreen {};

export const LoginScreen: React.FC<IHelloScreen> = () => {
    return (
        <ScreenContainer title='Вход и регистрация'>
            <LoginForm />
        </ScreenContainer>
    );
}
