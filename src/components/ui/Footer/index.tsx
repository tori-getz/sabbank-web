import React from 'react';

import { Container, } from 'react-bootstrap';

import cn from 'classnames';
import styles from './Footer.module.sass';

interface IFooter {};

export const Footer: React.FC<IFooter> = () => {
    return (
        <div className={cn(styles.footer)}>
            <Container>
            </Container>
        </div>            

    )
};