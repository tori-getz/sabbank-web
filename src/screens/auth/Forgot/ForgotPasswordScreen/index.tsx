
import React, { useState } from 'react';

import { Card, CardContent } from 'ui-neumorphism';

import { ScreenContainer } from '@containers';

import { Divider, Label, TextInput, Button } from '@components/ui';

import { useTranslation } from '@hooks';
import { useNavigate } from 'react-router';

import { AuthService } from '@services';

interface IForgotPasswordScreen {};

export const ForgotPasswordScreen: React.FC<IForgotPasswordScreen> = () => {
    const authService = new AuthService();

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [ email, setEmail ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);

    const onSubmit = async () => {
        try {
            setLoading(true);

            await authService.restore({ email });

            navigate('/forgot/verify', { state: { email } })
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScreenContainer title={t('Forgot password?')}>
            <div className="row">
                <div className="col-md-5 pb-5 pt-5 mx-auto">
                    <Card className='d-flex align-center flex-column'>
                        <CardContent className="p-4">
                            <h3 className="h4 pt-3 pb-2">{t('Forgot password?')}</h3>
                            <Divider />
                            <Label>{t('Enter your registration email below for instructions on how to reset your password.')}</Label>
                            <TextInput
                                value={email}
                                onChange={({ target: {value} }) => setEmail(value)}
                            />
                            <Button
                                label={t('Send')}
                                className='mt-4'   
                                disabled={loading}
                                onClick={onSubmit}
                                loading={loading}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ScreenContainer>
    )
}
