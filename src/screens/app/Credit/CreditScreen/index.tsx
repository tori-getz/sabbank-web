
import React, { useState, useEffect } from 'react';

import { ScreenContainer } from '@containers';

import styles from './CreditScreen.module.sass';
import { Row, Col } from 'react-bootstrap'

import { useTranslation, useCredit } from '@hooks';
import { useNavigate } from 'react-router-dom';

import {
    Button,
    Spinner,
    CreditItem
} from '@components/ui';

import {
    CreditBanner
} from '@components';


import { Card, CardContent } from 'ui-neumorphism';

import type { ICredit } from '@typing';
import { isEmpty } from 'lodash';

interface ICreditScreen {};

export const CreditScreen: React.FC<ICreditScreen> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [ loading, setLoading ] = useState<boolean>(true);

    const { creditsList, getCredits } = useCredit();

    const getData = async () => {
        try {
            await getCredits();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return (
            <ScreenContainer title={t('Credit')}>
                <Spinner />
            </ScreenContainer>
        )
    }

    if (isEmpty(creditsList)) {
        return (
            <ScreenContainer title={t('Deposit')}>
                <CreditBanner />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer title={t('Credit')}>
            <Row className="align-items-baseline mb-1">
                <Col xs md={8}>
                    <div className="widgetTitleL">{t('Credit')}</div>
                </Col> 
                <Col xs={12} md={4}>
                    <Button    
                        className="w-100"
                        label={t('Apply new credit')}
                        onClick={() => navigate('/credit/apply')}
                    />
                </Col>
            </Row>
            {/* <div className={styles.header}>
                <div className="widgetTitleL">{t('Credit')}</div>
            </div> */}
            <Card>
                <CardContent>
                    <div className='pt-3 p-md-4 mt-4'>
                        <div className="widgetTitle">{t('Executed loans')}</div>
                        {creditsList.map((credit: ICredit, key: number) => (
                            <CreditItem
                                item={credit}
                                key={key}
                                onClick={() => navigate(`/credit/${credit.id}`)}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
