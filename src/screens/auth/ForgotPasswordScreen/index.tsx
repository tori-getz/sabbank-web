
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

    const [ phone, setPhone ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);

    const onSubmit = async () => {
        try {
            setLoading(true);

            await authService.restore({ phone });

            navigate('/forgot/verify', { state: { phone } })
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
                            <Label>{t('Enter your registration phone number below for instructions on how to reset your password.')}</Label>
                            <TextInput
                                value={phone}
                                onChange={({ target: {value} }) => setPhone(value)}
                                id="phone"
                                maxLength={12}
                            />
                            <Button
                                label={t('Send')}
                                className='mt-4'   
                                disabled={phone.length !== 12 || loading}
                                onClick={onSubmit}
                                loading={loading}
                            />
                            {/* <div className="mt-3">
                                <Label>{t('Phone number')}</Label>
                            </div> */}
                            {/* <TextInput
                                value={phone}
                                onChange={({ target: {value} }) => setPhone(value)}
                                id="phone"
                            />
                            <div className="d-flex flex-wrap justify-content-between mt-3">
                                <Label>{t('Password')}</Label>
                                <a href="#" className="">{t('Forgot password?')}</a>
                            </div>
                            <TextInput
                                value={password}
                                onChange={({ target: {value} }) => setPassword(value)}
                            />
                            <div className="mt-4">
                                {error && (
                                    <Alert variant='danger'>
                                        {error}
                                    </Alert>
                                )}
                                <Button onClick={onSubmit} label={t('Sign in')} className="mt-2"/>
                            </div> */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ScreenContainer>
    )
}
