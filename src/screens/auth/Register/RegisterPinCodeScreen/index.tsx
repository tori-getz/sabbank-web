
import React, { useState } from 'react';

import { ScreenContainer } from '@containers';

import {
    useTranslation,
    useAuth
} from '@hooks';

import {
    useLocation
} from 'react-router-dom';

import {
    Divider,
    TextInput,
    Label,
    Button
} from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';

interface ILocationState {
    email: string
    code: string
}

interface IRegisterPinCodeScreen {};

export const RegisterPinCodeScreen: React.FC<IRegisterPinCodeScreen> = () => {
    const { t } = useTranslation();

    const { completeRegister } = useAuth();

    const location = useLocation();
    const { email, code } = location.state as ILocationState;

    const [ pinCode, setPinCode ] = useState<string>('');
    const [ repeatPinCode, setRepeatPinCode ] = useState<string>('');

    const onSubmit = async () => {
        await completeRegister({
            email,
            verify_code: code,
            pin_code: pinCode,
            pin_code_confirmation: repeatPinCode
        });
    }

    return (
        <ScreenContainer title={t('Sign up')}>
            <div className='row'>
                <div className='col-md-5 pb-5 pt-5 mx-auto'>
                    <Card className='d-flex align-center flex-column'>
                        <CardContent>
                            <div className='p-4'>
                                <h3 className='h4 pt-3 pb-2'>{t('Set PIN-code')}</h3>
                                <Divider />
                                <Label className='mt-4'>{t('Set PIN-code')}</Label>
                                <TextInput
                                    placeholder='****'
                                    value={pinCode}
                                    onChange={e => setPinCode(e.target.value)}
                                    maxLength={4}
                                    type='password'
                                />
                                <Label className='mt-4'>{t('Repeat PIN-code')}</Label>
                                <TextInput
                                    placeholder='****'
                                    value={repeatPinCode}
                                    onChange={e => setRepeatPinCode(e.target.value)}
                                    maxLength={4}
                                    type='password'
                                />
                                <Button
                                    className='w-100 mt-5'
                                    label={t('Save')}
                                    disabled={pinCode.length !== 4 || pinCode !== repeatPinCode}
                                    onClick={onSubmit}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ScreenContainer>
    )
}
