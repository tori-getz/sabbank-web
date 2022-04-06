
import React from 'react';

import { ScreenContainer } from '@containers';

import {
    useTranslation
} from '@hooks';

import { useNavigate } from 'react-router-dom';

import {
    GoBack,
    Label,
    TextInput,
    Button
} from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';

interface ISupportFormScreen {};

export const SupportFormScreen: React.FC<ISupportFormScreen> = () => {
    const { t } = useTranslation();
    
    const navigate = useNavigate();

    return (
        <ScreenContainer title={t('Support')}>
            <GoBack onClick={() => navigate(-1)} />
            <h3>{t('Support')}</h3>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        <h4>{t('Feedback form')}</h4>
                        <h5 className='mt-4'>Email</h5>
                        <Label>{t('Enter Email')}</Label>
                        <TextInput
                            placeholder='user@example.com'
                        />
                        <h5 className='mt-4'>{t('Description')}</h5>
                        <Label>{t('Description your problem')}</Label>
                        <TextInput
                        />
                        <Button
                            className='mt-4'
                            label={t('Send')}
                        />
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
