
import React, { useState } from 'react';

import { Card, CardContent } from 'ui-neumorphism';

import { ScreenContainer } from '@containers';

import { useTranslation } from '@hooks';

import { AuthService } from '@services';

import { Label, TextInput, Divider, Button } from '@components/ui'

import { useLocation, useNavigate } from 'react-router';

interface IForgotVerifyScreen {};

export const ForgotVerifyScreen: React.FC<IForgotVerifyScreen> = () => {
    const authService = new AuthService();

    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [ code, setCode ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);

    const onSubmit = async () => {
        try {
            setLoading(true);
            
            await authService.restoreVerify({ 
                // @ts-ignore
                phone: location.state?.phone,
                verify_code: code    
            });

            navigate('/forgot/changepassword', {
                state: {
                    // @ts-ignore
                    phone: location.state.phone,
                    code
                }
            });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScreenContainer title={t('Password recovery')}>
            <div className='row'>
                <div className='col-md-5 pb-5 pt-5 mx-auto'>
                    <Card className='d-flex align-center flex-column'>
                        <CardContent className='p-4'>
                            <h3 className="h4 pt-3 pb-2">{t('Confirmation code')}</h3>
                            <Divider />
                            <Label>{t('Enter the one-time verification code sent to your phone')}</Label>
                            <TextInput
                                value={code}
                                maxLength={4}
                                onChange={e => setCode(e.target.value)}
                            />
                            <Button
                                className='mt-4'
                                label={t('Next')}
                                onClick={onSubmit}
                                disabled={code.length !== 4 || loading}
                                loading={loading}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ScreenContainer>
    )
}
