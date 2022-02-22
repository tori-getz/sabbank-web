
import React, { useState } from 'react';

import { Card, CardContent} from 'ui-neumorphism';
import { Alert } from 'react-bootstrap';
import { TextInput, Button, Divider, Label } from '@components/ui'

import { Link } from 'react-router-dom';

import { useAuth, useTranslation } from '@hooks';

interface ILoginForm {};

export const LoginForm: React.FC<ILoginForm> = () => {
    const [ phone, setPhone ] = useState<string>(''); 
    const [ password, setPassword ] = useState<string>('');

    const [ error, setError ] = useState<string>('');

    const { t } = useTranslation();

    const { login } = useAuth();

    const onSubmit = async () => {
        try {
            await login({ phone, password });
        } catch (e) {
            setError(t(e.message));
        }
    }

    return (        
        <div className="row">
            <div className="col-md-5 pb-5 pt-5 mx-auto">
                <Card className='d-flex align-center flex-column'>
                    <CardContent className="p-4">
                        <h3 className="h4 pt-3 pb-2">{t('Sign in')}</h3>
                        <Divider />
                        <div className="mt-3">
                            <Label>{t('Phone number')}</Label>
                        </div>
                        <TextInput
                            value={phone}
                            onChange={({ target: {value} }) => setPhone(value)}
                            id="phone"
                            maxLength={12}
                        />
                        <div className="d-flex flex-wrap justify-content-between mt-3">
                            <Label>{t('Password')}</Label>
                            <Link to='/forgot'>{t('Forgot password?')}</Link>
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
                        </div>
                        <div className='d-flex justify-content-center align-items-center mt-4'>
                            <Label>Нет аккаунта?</Label>
                            <Link to='/register'>{t('Sign up')}</Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
