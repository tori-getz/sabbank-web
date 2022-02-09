
import React from 'react';

import { Container } from 'react-bootstrap';

import { ScreenContainer } from '@containers';
import { LoginForm } from '@components';
import { Navbar } from '@components/ui';

import styles from './HelloScreen.module.sass';

interface IHelloScreen {};

export const HelloScreen: React.FC<IHelloScreen> = () => {
    return (
        <ScreenContainer title='Вход и регистрация'>
            <Navbar />
            <Container>
                <div className={styles.wrapper}>
                    <LoginForm />
                </div>
            </Container>
        </ScreenContainer>
    );
}
