
import React, { useState } from 'react';

import { ScreenContainer } from '@containers';

import {
    useTranslation,
    useSupport
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

    const {
        sendFeedback
    } = useSupport();

    const [ message, setMessage ] = useState<string>('');

    const [ success, setSuccess ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);

    const onSubmit = async () => {
        try {
            setLoading(true);

            await sendFeedback({
                body: message
            });

            setSuccess(true);
        } catch (e) {
            console.error(e);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScreenContainer title={t('Support')}>
            <GoBack onClick={() => navigate(-1)} />
            <h3>{t('Support')}</h3>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        <h4>{t('Feedback form')}</h4>
                        <h5 className='mt-4'>{t('Description')}</h5>
                        <Label>{t('Description your problem')}</Label>
                        <TextInput
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                        <Button
                            disabled={message === '' || loading}
                            loading={loading}
                            className='mt-4'
                            label={t('Send')}
                            onClick={onSubmit}
                        />
                        {success && (
                            <div className='my-2'>Отправлено!</div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
