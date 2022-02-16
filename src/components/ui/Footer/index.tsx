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
                    <div className="col-lg-3 pb-4 mb-2">
                        <a className="site-logo d-inline-block mb-4" href="/">
                            <img src="/assets/img/logo.svg" alt="SAB Bank"/>
                        </a> 
                        <a className={cn(styles.marketBtn, styles['apple-btn'], 'mr-3 mb-3')} href="#">
                            <span className="mb-subtitle">Download on the</span>
                            <span className="mb-title">App Store</span>
                        </a>
                        <a className="market-btn google-btn mr-3 mb-3" href="#">
                            <span className="mb-subtitle">Download on the</span>
                            <span className="mb-title">Google Play</span>
                        </a>
                        <p className="text-sm text-muted">&copy; Sabbank, 2021 Все права защищены.</p>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                        <div className="col-md-6">
                            <h4 className="widget-title">Product</h4>
                            <div className="widget widget-categories">
                            <ul>
                                <li><a href="#">How it works</a></li>
                                <li><a href="#">Benefits</a></li>
                                <li><a href="#">Features</a></li>
                            </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h4 className="widget-title">{t('Support')}</h4>                            
                            <div className="widget widget-categories">
                            <ul>
                                <li><a href="#">Terms & Conditions</a></li>
                                <li><a href="#">Privacy policy</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="widget">
                        <h4 className="widget-title">Contact</h4>
                            <ul>
                                <li><a href="mailto:support@example.com">ihtop@zeoju.org</a></li>
                                <li><a href="#">11-000-000</a></li>
                            </ul>
                            <a className="social-btn sb-instagram" href="#"><i className="socicon-instagram"></i></a>
                            <a className="social-btn sb-facebook" href="#"><i className="socicon-facebook"></i></a>
                            <a className="social-btn sb-youtube" href="#"><i className="socicon-youtube"></i></a>
                        </div>
                    </div>
                </div>                
            </Container>
        </footer>            

    )
};