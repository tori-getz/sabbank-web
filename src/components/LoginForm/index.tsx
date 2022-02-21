
import React, { useState } from 'react';

import { Card, CardContent} from 'ui-neumorphism';
import { Alert } from 'react-bootstrap';
import { TextInput, Button, Divider, Label } from '@components/ui'

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
                        <h3 className="h4 pt-3 pb-2">Войти</h3>
                        <Divider />
                        <div className="mt-3">
                            <Label>Номер телефона</Label>
                        </div>
                        <TextInput
                            placeholder={t('Phone number')}
                            value={phone}
                            onChange={({ target: {value} }) => setPhone(value)}
                            id="phone"
                        />
                        <div className="d-flex flex-wrap justify-content-between mt-3">
                            <Label>Пароль</Label>
                            <a href="#" className="">Забыли пароль?</a>
                        </div>
                        <TextInput
                            placeholder={t('Password')}
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
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
