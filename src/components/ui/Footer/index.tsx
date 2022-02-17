import React from 'react';

import { Container, } from 'react-bootstrap';

import cn from 'classnames';
import styles from './Footer.module.sass';
import { useTranslation } from '@hooks'

interface IFooter {};

export const Footer: React.FC<IFooter> = () => {
    const { t } = useTranslation(); 
    return (
        <footer className={cn(styles.footer, 'mt-auto')}>
            <Container>
                <div className="row py-5">
                    <div className="col-lg-5 pb-4 mb-2">
                        <a className="site-logo d-inline-block mb-4" href="/">
                            <img src="/assets/img/logo.svg" alt="SAB Bank"/>
                        </a> 
                        <div>
                            <a className="d-inline-block mb-4" href="/">
                                <img src="/assets/img/App-Store-badge.svg" alt="SAB Bank"/>
                            </a> 
                            <a className="d-inline-block mb-4" href="/">
                                <img src="/assets/img/Google-Play-badge.svg" alt="SAB Bank"/>
                            </a> 
                        </div>
                        <p className="text-sm text-muted">&copy; Sabbank, 2022 Все права защищены.</p>
                    </div>
                    <div className="col-lg-7">
                        <div className="row">
                            <div className="col-md-4">
                                <div className={styles.categoriesTitle}>Product</div>
                                <ul className={styles.categoriesList}>
                                    <li><a href="#">How it works</a></li>
                                    <li><a href="#">Benefits</a></li>
                                    <li><a href="#">Features</a></li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <div className={styles.categoriesTitle}>{t('Support')}</div>                            
                                <ul className={styles.categoriesList}>
                                    <li><a href="#">Terms & Conditions</a></li>
                                    <li><a href="#">Privacy policy</a></li>
                                    <li><a href="#">FAQ</a></li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <div className={styles.categoriesTitle}>Contact</div>
                                <ul className={styles.categoriesList}>
                                    <li><a href="mailto:support@example.com">ihtop@zeoju.org</a></li>
                                    <li><a href="#">11-000-000</a></li>
                                </ul>
                                <div>
                                    <a className="d-inline-block mb-4" href="/">
                                        <img src="/assets/img/instagram.svg" alt="SAB Bank"/>
                                    </a> 
                                    <a className="d-inline-block mb-4" href="/">
                                        <img src="/assets/img/facebook.svg" alt="SAB Bank"/>
                                    </a> 
                                    <a className="d-inline-block mb-4" href="/">
                                        <img src="/assets/img/youtube.svg" alt="SAB Bank"/>
                                    </a> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </Container>
        </footer>            

    )
};