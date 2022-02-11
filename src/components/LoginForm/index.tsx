
import React, { useState } from 'react';

import { Button, TextField, Card, CardContent} from 'ui-neumorphism';
import { Alert } from 'react-bootstrap';

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
            <div className="col-md-6 pb-5 mx-auto">
                <Card className='d-flex align-center flex-column'>
                    <CardContent>
                    <h3 className="h5 pt-4 pb-2">Войти</h3>
                    <hr />

                    <TextField
                        placeholder={t('Phone number')}
                        value={phone}
                        onChange={({ value }) => setPhone(value)}
                    />
                    <div className="d-flex flex-wrap justify-content-between">
                        <div>Пароль</div>
                        <a href="#">Забыли пароль?</a>
                    </div>
                    <TextField
                        placeholder={t('Password')}
                        value={password}
                        onChange={({ value }) => setPassword(value)}
                    />
                    {error && (
                        <Alert variant='danger'>
                            {error}
                        </Alert>
                    )}
                    <Button onClick={onSubmit}>
                        {t('Sign in')}
                    </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
