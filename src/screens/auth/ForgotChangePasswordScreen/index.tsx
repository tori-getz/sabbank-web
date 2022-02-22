
import React, { useState } from "react";

import { useLocation } from 'react-router';

import { useTranslation } from '@hooks';

import { ScreenContainer } from '@containers';

import { Label, TextInput, Button, Divider } from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';

import { AuthService } from '@services';

interface IForgotChangePasswordScreen {};

export const ForgotChangePasswordScreen: React.FC<IForgotChangePasswordScreen> = () => {
    const authService = new AuthService();

    const location = useLocation();
    const { t } = useTranslation();

    const [ loading, setLoading ] = useState<boolean>(false);

    const [ password, setPassword ] = useState<string>('');
    const [ repeatPassword, setRepeatPassword ] = useState<string>('');

    const getButtondDisabledState = (): boolean => {
        if (loading) return true;

        if (!password || !repeatPassword) return true;

        if (password !== repeatPassword) return true;

        return false;
    }

    const onSubmit = async () => {
        try {
            setLoading(true);

            await authService.restoreComplete({
                // @ts-ignore
                phone: location.state.phone,
                new_password: password,
                // @ts-ignore
                verify_code: location.state.code
            });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScreenContainer title={t('Creating a new password')}>
            <div className='row'>
                <div className='col-md-5 pb-5 pt-5 mx-auto'>
                    <Card className='d-flex align-center flex-column'>
                        <CardContent className='p-4'>
                            <h3 className="h4 pt-3 pb-2">{t('Creating a new password')}</h3>
                            <Divider />
                            <Label>{t('Create a strong password consisting of letters, numbers and symbols')}</Label>
                            <TextInput
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Label className="mt-3">{t('Confirm password')}</Label>
                            <TextInput
                                type='password'
                                value={repeatPassword}
                                onChange={e => setRepeatPassword(e.target.value)}
                            />
                            <Button
                                className='mt-4'
                                disabled={getButtondDisabledState()}
                                label={t('Next')}
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
