
import React, { useState } from 'react';

import { ScreenContainer } from '@containers';

import {
    useTranslation,
    useAuth
} from '@hooks';

import {
    useLocation,
    useNavigate
} from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism';

import {
    Divider,
    Label,
    TextInput,
    Button
} from '@components/ui';

interface ILocationState {
    email: string
}

interface IRegisterVerifyScreen {};

export const RegisterVerifyScreen: React.FC<IRegisterVerifyScreen> = () => {
    const { t } = useTranslation();

    const { verifyRegister } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const { email } = location.state as ILocationState;

    const [ code, setCode ] = useState<string>('');

    const onSubmit = async () => {
        try {
            await verifyRegister({
                email,
                verify_code: code
            });

            navigate('/register/pincode', { state: { email } });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <ScreenContainer title={t('Sign up')}>
            <div className='row'>
                <div className="col-md-5 pb-5 pt-5 mx-auto">
                    <Card className='d-flex align-center flex-column'>
                        <CardContent className='p-4'>
                            <h3 className="h4 pt-3 pb-2">{t('Confirmation code')}</h3>
                            <Divider />
                            <Label>{t('Enter the one-time verification code sent to your phone')}</Label>
                            <TextInput
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                placeholder='****'
                                maxLength={4}
                            />
                            <Button
                                label={t('Next')}
                                className='w-100 mt-4'
                                disabled={code.length !== 4}
                                onClick={onSubmit}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ScreenContainer>
    )
}
