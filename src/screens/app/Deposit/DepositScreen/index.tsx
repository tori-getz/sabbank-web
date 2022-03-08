
import React, { useEffect, useState } from 'react';

import { useTranslation, useDeposit } from '@hooks';

import { ScreenContainer } from '@containers';

import {
    TotalEarnings,
    DepositGroup,
    DepositBanner
} from '@components';

import { Button, Spinner } from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';
import { Row, Col } from 'react-bootstrap'

import type {
    IDepositGroup
} from '@typing';

import { useNavigate } from 'react-router-dom';

import { isEmpty } from 'lodash';

interface IDepositScreen {};

export const DepositScreen: React.FC<IDepositScreen> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { depositList, getDeposits } = useDeposit();

    const [ loading, setLoading ] = useState<boolean>(true);

    const getDepositsList = async () => {
        try {
            await getDeposits();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getDepositsList();
    }, []);

    if (loading) {
        return (
            <ScreenContainer title={t('Deposit')}>
                <Spinner />
            </ScreenContainer>
        )
    }

    if (isEmpty(depositList)) {
        return (
            <ScreenContainer title={t('Deposit')}>
                <DepositBanner />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer title={t('Deposit')}>
            <div className="widgetTitleL">{t('Deposit')}</div>
            <Row className="align-items-baseline mb-1">
                <Col xs md={8}>
                    <TotalEarnings />
                </Col> 
                <Col xs={12} md={4}>
                    <Button    
                        className="w-100"
                        label={t('Open deposit')}
                        onClick={() => navigate('/deposit/new')}
                    />
                </Col>
            </Row>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        {depositList.map((depositGroup: IDepositGroup, key: number) => (
                            <DepositGroup
                                group={depositGroup}
                                key={key}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
