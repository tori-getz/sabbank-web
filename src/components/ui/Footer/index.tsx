import React from 'react';

import { Container, } from 'react-bootstrap';

import cn from 'classnames';
import styles from './Footer.module.sass';
import { useTranslation } from '@hooks'

import { Link } from 'react-router-dom';

interface IFooter {};

export const Footer: React.FC<IFooter> = () => {
    const { t } = useTranslation(); 
    
    return (
        <footer className={cn(styles.footer, 'mt-auto')}>
            <Container>
                <div className="row py-5">
                    <div className={cn(styles.footerLogoColumn, 'col-lg-5')}>
                        <a className="site-logo d-md-inline-block mb-4" href="/dashboard">
                            <img src="/assets/img/logo.svg" alt="SAB Bank"/>
                        </a> 
                        <div>
                            <a className={styles.storeLink} href="#">
                                <img src="/assets/img/App-Store-badge.svg" alt="SAB Bank"/>
                            </a> 
                            <a className={styles.storeLink} href="#">
                                <img src="/assets/img/Google-Play-badge.svg" alt="SAB Bank"/>
                            </a> 
                        </div>
                        <p className="text-sm text-muted m-0">&copy; SabBank, 2022 {t('All rights reserved')}</p>
                    </div>
                    <div className="col-lg-7 mb-3">
                        <div className="row">
                            <div className="col-4">
                                <div className={styles.categoriesTitle}>{t('Product')}</div>
                                <ul className={styles.categoriesList}>
                                    <li><a href="#">{t('How it works')}</a></li>
                                    <li><a href="#">{t('Benefits')}</a></li>
                                    <li><a href="#">{t('Features')}</a></li>
                                </ul>
                            </div>
                            <div className="col-4">
                                <div className={styles.categoriesTitle}>{t('Support')}</div>                            
                                <ul className={styles.categoriesList}>
                                    <li><a href="#">{t('Terms & Conditions')}</a></li>
                                    <li><a href="#">{t('Privacy policy')}</a></li>
                                    <li><Link to="/support/faq">FAQ</Link></li>
                                </ul>
                            </div>
                            <div className="col-4">
                                <div className={styles.categoriesTitle}>{t('Contact')}</div>
                                <ul className={styles.categoriesList}>
                                    <li><a href="mailto:support@sabbank.com">s@sabbank.com</a></li>
                                    <li><a href="#">11-000-000</a></li>
                                </ul>
                                <div>
                                    <a className={styles.socialLink} href="#">
                                        <img src="/assets/img/instagram.svg" alt="SAB Bank"/>
                                    </a> 
                                    <a className={styles.socialLink} href="#">
                                        <img src="/assets/img/facebook.svg" alt="SAB Bank"/>
                                    </a> 
                                    <a className={styles.socialLink} href="#">
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